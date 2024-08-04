const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST route for user registration
router.post('/register', authController.register);

// POST route for user login
router.post('/login', authController.login);

// GET route for user logout
router.get('/logout', authController.logout);

// GET route to fetch registration page content
router.get('/registration-content', authController.getRegistrationContent);

// GET route to fetch login page content
router.get('/login-content', authController.getLoginContent);

// GET route to check authentication status (protected route)
router.get('/status', authController.protect, authController.checkAuthStatus);

module.exports = router;