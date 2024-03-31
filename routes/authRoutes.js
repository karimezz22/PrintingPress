//routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../utils/validators/authValidator");
const { authenticated } = require('../middleware/auth');


router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/protected", authenticated,  authController.protectRoute, (req, res) => {
  // If execution reaches here, it means authentication was successful
  return res.status(200).json({ message: "Authentication successful." });
});
module.exports = router;
