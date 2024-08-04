const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

// Protect all routes in this router
router.use(authController.protect);

// GET route to fetch dashboard data
router.get('/', dashboardController.getDashboardData);

module.exports = router;