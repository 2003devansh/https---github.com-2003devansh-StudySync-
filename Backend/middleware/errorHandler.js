// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
  
    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  };
  
  module.exports = errorHandler;
  