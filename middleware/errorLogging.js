const fs = require('fs');
const path = require('path');


const errorLogStream = fs.createWriteStream(path.join(__dirname, '../logs', 'error.log'), { flags: 'a' });

function errorLogger(err, req, res, next) {
  const timestamp = new Date().toISOString();
  const errorMessage = `${timestamp} - ${err.message}\n`;
  errorLogStream.write(errorMessage);
  next(err); 
}

module.exports = errorLogger;