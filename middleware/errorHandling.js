// Middleware for error handling

function errorHandler(err, req, res, next) {
    // Implement error handling logic here
    // Log the error or perform any necessary cleanup tasks
    // Send an appropriate error response to the client
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal Server Error'
      }
    });
  }
  
  module.exports = {
    errorHandler
  };
  