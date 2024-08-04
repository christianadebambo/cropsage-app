const Contact = require('../models/contactModel');
const { body, validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync');

// Validation middleware for contact form
exports.validateContactForm = [
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 1 }).withMessage('Message is required')
];

// Submit contact form
exports.submitContactForm = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.errors = errors.array();
    throw error;
  }

  // Extract form data
  const { firstName, lastName, email, message } = req.body;

  // Create and save new contact submission
  const contact = new Contact({ firstName, lastName, email, message });
  await contact.save();

  // Log the submission (truncate message for brevity)
  console.log('New contact form submission:', {
    firstName,
    lastName,
    email,
    message: message.substring(0, 50) + (message.length > 50 ? '...' : '')
  });

  // Send success response
  res.status(201).json({ message: 'Contact form submitted successfully' });
});

// Get contact page content
exports.getContactPageContent = catchAsync(async (req, res, next) => {
  const content = {
    title: "Contact Us",
    description: "Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.",
    formFields: [
      { name: "firstName", label: "First Name", type: "text" },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "message", label: "Message", type: "textarea" }
    ],
    submitButtonText: "Submit"
  };

  res.json(content);
});