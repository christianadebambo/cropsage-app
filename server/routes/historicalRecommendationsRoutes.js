const express = require('express');
const router = express.Router();
const historicalRecommendationsController = require('../controllers/historicalRecommendationsController');
const authController = require('../controllers/authController');

// Protect all routes in this router
router.use(authController.protect);

// GET route to fetch all historical recommendations
router.get('/', historicalRecommendationsController.getHistoricalRecommendations);

// GET route to fetch details of a specific recommendation
router.get('/:id', historicalRecommendationsController.getRecommendationDetails);

module.exports = router;