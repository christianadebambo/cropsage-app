const catchAsync = require('../utils/catchAsync');

// Get dashboard data for the authenticated user
exports.getDashboardData = catchAsync(async (req, res, next) => {
  // Prepare dashboard data from user information
  const dashboardData = {
    farmerName: `${req.user.firstName} ${req.user.lastName}`,
    farmName: req.user.farmName,
    location: req.user.location
  };

  // Send the dashboard data as a response
  res.status(200).json({
    status: 'success',
    data: dashboardData
  });
});