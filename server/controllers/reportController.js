const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const User = require('../models/userModel');
const Recommendation = require('../models/recommendationModel');
const catchAsync = require('../utils/catchAsync');
require('dotenv').config();

// Initialize AWS Lambda and S3 clients
const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Generate a report based on the latest recommendation
exports.generateReport = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const recommendation = await Recommendation.findOne({ userId }).sort({ createdAt: -1 });
  
  if (!recommendation) {
    const error = new Error('No recommendation found for this user');
    error.statusCode = 404;
    throw error;
  }

  // If a report already exists, return its ID
  if (recommendation.reportId) {
    return res.status(200).json({ reportId: recommendation.reportId });
  }

  const user = await User.findById(userId);
  const reportId = `report-${Date.now()}`;

  // Prepare report data
  const reportData = {
    reportId,
    userId: userId.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    farmName: user.farmName,
    location: user.location,
    soilData: recommendation.soilData,
    recommendedCrop: recommendation.recommendedCrop,
    sustainablePractices: recommendation.sustainablePractices,
    timestamp: new Date().toISOString()
  };

  // Invoke Lambda function to generate report
  const params = {
    FunctionName: 'GenerateReportLambda',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({ body: reportData })
  };
  const command = new InvokeCommand(params);
  const response = await lambdaClient.send(command);

  // Parse Lambda response
  const payloadString = new TextDecoder().decode(response.Payload);
  const result = JSON.parse(payloadString);

  if (result.statusCode !== 200) {
    const error = new Error('Report generation failed');
    error.statusCode = result.statusCode;
    throw error;
  }

  const body = JSON.parse(result.body);
  recommendation.reportId = body.reportId;
  await recommendation.save();

  res.status(200).json({ reportId: body.reportId });
});

// Check the status of a report and return a signed URL if it's ready
exports.getReportStatus = catchAsync(async (req, res, next) => {
  const { reportId } = req.params;
  const bucketName = process.env.S3_REPORT_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('S3_REPORT_BUCKET_NAME environment variable is not set');
  }

  const key = `reports/${reportId}.pdf`;
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    await s3Client.send(command);
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    res.status(200).json({ status: 'completed', url: signedUrl });
  } catch (error) {
    if (error.name === 'NoSuchKey') {
      res.status(200).json({ status: 'pending' });
    } else {
      throw error;
    }
  }
});