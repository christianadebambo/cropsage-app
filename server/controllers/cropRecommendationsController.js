const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const SustainablePracticesModel = require('../models/sustainablePracticesModel');
const Recommendation = require('../models/recommendationModel');
const catchAsync = require('../utils/catchAsync');
require('dotenv').config();

// Initialize AWS Lambda client
const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Get crop recommendations based on soil data
exports.getCropRecommendations = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const soilData = req.body;

  // Prepare parameters for Lambda function invocation
  const params = {
    FunctionName: 'CropPredictionLambda',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(soilData)
  };

  const command = new InvokeCommand(params);

  // Measure Lambda function execution time
  const startTime = Date.now();
  const response = await lambdaClient.send(command);
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(`Lambda function execution time: ${duration} ms`);

  // Parse Lambda response
  const payloadString = new TextDecoder().decode(response.Payload);
  console.log('Lambda response:', payloadString);
  const prediction = JSON.parse(payloadString);

  if (prediction.statusCode !== 200) {
    const error = new Error('Prediction failed');
    error.statusCode = prediction.statusCode;
    throw error;
  }

  const predictionBody = JSON.parse(prediction.body);
  const recommendedCrop = predictionBody.prediction;

  // Get sustainable practices for the recommended crop
  const sustainablePractices = SustainablePracticesModel.getPracticesForCrop(recommendedCrop);

  // Save or update the recommendation in the database
  await Recommendation.findOneAndUpdate(
    { userId, soilData },
    {
      userId,
      soilData,
      recommendedCrop,
      sustainablePractices
    },
    { new: true, upsert: true }
  );

  // Send the recommendation as a response
  res.status(200).json({
    title: "Crop Recommendation",
    description: `Based on your soil data, we recommend growing:`,
    recommendation: recommendedCrop,
    sustainablePractices: sustainablePractices
  });
});