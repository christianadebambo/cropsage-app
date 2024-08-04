const FAQModel = require('../models/faqModel');
const catchAsync = require('../utils/catchAsync');

// Get all FAQ data
exports.getFAQData = catchAsync(async (req, res, next) => {
  const faqModel = new FAQModel();
  const faqData = faqModel.getFAQData();
  res.json(faqData);
});

// Get a specific FAQ category by name
exports.getCategoryByName = catchAsync(async (req, res, next) => {
  const { categoryName } = req.params;
  const faqModel = new FAQModel();
  const category = faqModel.getCategoryByName(categoryName);

  if (category) {
    res.json(category);
  } else {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
});