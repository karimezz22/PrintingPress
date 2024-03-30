//utils/token.js
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ 
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role 
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

const generateRandomToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

module.exports = { generateToken, generateRandomToken };
