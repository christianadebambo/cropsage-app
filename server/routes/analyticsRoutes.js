const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authController = require('../controllers/authController');

// Protect all routes in this router
router.use(authController.protect);

// GET route to fetch analytics content
router.get('/', analyticsController.getAnalyticsContent);

module.exports = router;