const catchAsync = require('../utils/catchAsync');
const Recommendation = require('../models/recommendationModel');

// Get all historical recommendations for a user
exports.getHistoricalRecommendations = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const recommendations = await Recommendation.find({ userId })
    .sort({ createdAt: -1 })
    .select('recommendedCrop createdAt');

  res.status(200).json({
    status: 'success',
    data: {
      title: "Historical Recommendations",
      description: "View your past crop recommendations and track your farming progress.",
      recommendations
    }
  });
});

// Get details of a specific recommendation
exports.getRecommendationDetails = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const recommendationId = req.params.id;
  const recommendation = await Recommendation.findOne({ _id: recommendationId, userId });

  if (!recommendation) {
    const error = new Error('Recommendation not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    status: 'success',
    data: recommendation
  });
});