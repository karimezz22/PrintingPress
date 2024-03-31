//routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../utils/validators/authValidator");
const validatorMiddleware = require("../middleware/validatorMiddleware");


router.post("/register",              registerValidator,   authController.register);
router.post("/login",                 loginValidator,      authController.login);
router.get("/verify-email/:token",    validatorMiddleware, authController.verifyEmail);
router.post("/logout",                validatorMiddleware, authController.logout);
router.post("/forgot-password",       validatorMiddleware, authController.forgotPassword);
router.post("/reset-password/:token", validatorMiddleware, authController.resetPassword);
router.get("/protected",              validatorMiddleware, authController.protected);

module.exports = router;