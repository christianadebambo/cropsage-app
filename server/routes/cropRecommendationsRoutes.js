const express = require('express');
const router = express.Router();
const cropRecommendationsController = require('../controllers/cropRecommendationsController');
const authController = require('../controllers/authController');

// Protect all routes in this router
router.use(authController.protect);

// POST route to get crop recommendations based on submitted data
router.post('/', cropRecommendationsController.getCropRecommendations);

module.exports = router;