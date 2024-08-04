const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET route to fetch contact page content
router.get('/content', contactController.getContactPageContent);

// POST route to submit contact form (with validation middleware)
router.post('/submit', contactController.validateContactForm, contactController.submitContactForm);

module.exports = router;