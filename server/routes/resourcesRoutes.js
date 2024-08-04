const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');
const authController = require('../controllers/authController');

// Protect all routes in this router
router.use(authController.protect);

// GET route to fetch resources content
router.get('/', resourcesController.getResourcesContent);

module.exports = router;