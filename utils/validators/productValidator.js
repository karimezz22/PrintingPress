//utils/validators/authValidator.js
const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Product = require("../../models/product");