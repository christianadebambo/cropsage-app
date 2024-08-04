const express = require('express');
const router = express.Router();
const soilDataController = require('../controllers/soilDataController');
const authController = require('../controllers/authController');

// Protect all routes in this router
router.use(authController.protect);

// GET route to fetch soil data content
router.get('/', soilDataController.getSoilDataContent);

// POST route to submit soil data
router.post('/submit', soilDataController.submitSoilData);

module.exports = router;