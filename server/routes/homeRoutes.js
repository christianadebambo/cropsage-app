const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// GET route to fetch home page data
router.get('/', homeController.getHomeData);

module.exports = router;