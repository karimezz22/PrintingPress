// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === 'ValidationError') {
    status = 400;
    message = err.errors.map(error => error.msg).join(', ');
  }

  if (err.name === 'MongoError') {
    status = 500;
    message = "Database Error: An error occurred while accessing the database.";
  }

  console.error(err, err.stack);
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞',
  });
};

module.exports = { errorHandler };