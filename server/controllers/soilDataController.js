const catchAsync = require('../utils/catchAsync');
const Recommendation = require('../models/recommendationModel');

// Get content for the soil data input page
exports.getSoilDataContent = catchAsync(async (req, res, next) => {
  const content = {
    title: "Soil Data Input",
    description: "Input your soil data to receive personalised crop recommendations.",
  };
  res.status(200).json({
    status: 'success',
    data: content
  });
});

// Submit soil data and create a new recommendation
exports.submitSoilData = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const soilData = req.body;

  // Create a new recommendation with the submitted soil data
  const recommendation = new Recommendation({
    userId,
    soilData
  });

  await recommendation.save();

  res.status(200).json({
    status: 'success',
    message: 'Soil data submitted successfully',
    data: soilData
  });
});