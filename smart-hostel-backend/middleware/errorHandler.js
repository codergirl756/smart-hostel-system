// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose duplicate key error (e.g., roomNo already exists)
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate entry. Room number must be unique.'
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }

  // CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }

  // Default error
  res.status(500).json({
    message: err.message || 'Something went wrong!'
  });
};

module.exports = errorHandler;