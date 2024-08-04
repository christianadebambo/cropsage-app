const errorHandler = (err, req, res, next) => {
  // Set default status code and status if not provided
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Send error response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

module.exports = errorHandler;