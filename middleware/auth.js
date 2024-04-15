// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    // Check if the token is in the expected format
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format." });
    }

    // Extract the JWT token
    const jwtToken = tokenParts[1];

    // Verify the token
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    // Check if the Authorization header exists
    if (!token) {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }

    // Split the token and decode it
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }

    const decodedToken = jwt.decode(tokenParts[1]);

    if (!decodedToken || !decodedToken.role || decodedToken.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }

    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


module.exports = {authenticated, isAdmin};
