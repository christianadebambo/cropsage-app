const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync');

// Function to sign a JWT token
const signToken = (id) => {
  return jwt.sign(
    { id, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET,
    { expiresIn: '2h' } // 2 hour expiration
  );
};

// User registration
exports.register = [
  // Validation middleware
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('farmName').trim().notEmpty().withMessage('Farm name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  catchAsync(async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.errors = errors.array();
      throw error;
    }

    // Create new user
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      farmName: req.body.farmName,
      location: req.body.location,
      email: req.body.email,
      password: req.body.password
    });

    // Sign token and set cookie
    const token = signToken(newUser._id);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });

    // Send response
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      }
    });
  })
];

// User login
exports.login = [
  // Validation middleware
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  catchAsync(async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.errors = errors.array();
      throw error;
    }

    // Check if user exists and password is correct
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      const error = new Error('Incorrect email or password');
      error.statusCode = 401;
      throw error;
    }

    // Sign token and set cookie
    const token = signToken(user._id);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  })
];

// Middleware to protect routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    const error = new Error('You are not logged in');
    error.statusCode = 401;
    throw error;
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    const error = new Error('The user belonging to this token no longer exists');
    error.statusCode = 401;
    throw error;
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Get registration page content
exports.getRegistrationContent = catchAsync(async (req, res, next) => {
  const content = {
    title: "Register for CropSage",
    description: "Create your account to start optimising your crop selection.",
    formFields: [
      { name: "firstName", label: "First Name", type: "text" },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "farmName", label: "Farm Name", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      { name: "confirmPassword", label: "Confirm Password", type: "password" }
    ],
    submitButtonText: "Register"
  };
  
  res.json(content);
});

// Get login page content
exports.getLoginContent = catchAsync(async (req, res, next) => {
  const content = {
    title: "Login to CropSage",
    description: "Access your account to manage your farm and get personalized recommendations.",
    formFields: [
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" }
    ],
    submitButtonText: "Login"
  };
  
  res.json(content);
});

// User logout
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});

// Check authentication status
exports.checkAuthStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'authenticated', user: req.user });
});