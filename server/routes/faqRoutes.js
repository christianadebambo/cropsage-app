const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// GET route to fetch all FAQ data
router.get('/', faqController.getFAQData);

// GET route to fetch FAQ data for a specific category
router.get('/category/:categoryName', faqController.getCategoryByName);

module.exports = router;