// Error handling utilities

function handleError(message, status) {
    const error = new Error(message);
    error.status = status || 500;
    throw error;
  }
  
  module.exports = {
    handleError
  };