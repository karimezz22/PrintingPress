const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs', 'access.log'), { flags: 'a' });

const accessLogger = morgan('combined', { stream: accessLogStream });

module.exports = accessLogger;