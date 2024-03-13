const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

function register(req, res) {
  // Implement registration
  // Validate user inputs
  // Hash the user's password before storing it in the database.
  // insert the user's information into the database after validation
  // Implement error handling to provide meaningful error messages to users in case of validation failures
}

// function login(req, res) {
//   // Implement login
//   // Validate user inputs
//   // Validate the user's data against the stored data in the database
//   // generate JWT tokens
//   // using secure, HttpOnly cookies to store session tokens.
//   // return a response to the client indicating success.
// }

function logout(req, res) {
  // Implement logout
}

module.exports = {
  register,
  login,
  logout,
};
