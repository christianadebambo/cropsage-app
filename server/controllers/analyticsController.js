const catchAsync = require('../utils/catchAsync');
const Recommendation = require('../models/recommendationModel');

exports.getAnalyticsContent = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Fetch all recommendations for the user
  const recommendations = await Recommendation.find({ userId }).sort({ createdAt: 1 });

  const content = {
    title: "Analytics Dashboard",
    description: "Analyze your farming data and gain insights to improve your crop yields.",
    totalRecommendations: recommendations.length,
  };

  if (recommendations.length > 0) {
    // Process data for analytics
    const cropCounts = {};
    let totalSoilData = {};

    recommendations.forEach(rec => {
      // Count crop recommendations
      cropCounts[rec.recommendedCrop] = (cropCounts[rec.recommendedCrop] || 0) + 1;

      // Sum up soil data for averaging
      Object.entries(rec.soilData).forEach(([key, value]) => {
        totalSoilData[key] = (totalSoilData[key] || 0) + value;
      });
    });

    // Calculate average soil data
    const avgSoilData = {};
    Object.entries(totalSoilData).forEach(([key, value]) => {
      avgSoilData[key] = value / recommendations.length;
    });

    // Prepare crop distribution data
    content.cropDistribution = Object.entries(cropCounts).map(([crop, count]) => ({ crop, count }));

    // Add average soil data to content
    content.averageSoilData = avgSoilData;
  }

  // Send response
  res.status(200).json({
    status: 'success',
    data: content
  });
});