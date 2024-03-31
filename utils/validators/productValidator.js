//utils/validators/productValidator.js
const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Product = require("../../models/product");


exports.createProductValidator = [
  // Add validation rules for fields

  validatorMiddleware,
];