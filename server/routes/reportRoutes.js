const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController');

// Protect all routes in this router
router.use(authController.protect);

// POST route to generate a report
router.post('/generate', reportController.generateReport);

// GET route to check the status of a report
router.get('/status/:reportId', reportController.getReportStatus);

module.exports = router;