const HomeModel = require('../models/homeModel');
const catchAsync = require('../utils/catchAsync');

// Get home page data
exports.getHomeData = catchAsync(async (req, res, next) => {
  const homeModel = new HomeModel();
  const homeData = homeModel.getHomeData();
  res.json(homeData);
});