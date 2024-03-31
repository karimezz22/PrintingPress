const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const ProductModel = require("../../models/product");

exports.createProductValidator = [
  check("name")
    .notEmpty().withMessage("Product name is required.")
    .isLength({ min: 2 }).withMessage("Product name must be at least 2 characters long.")
    .isLength({ max: 50 }).withMessage("Product name cannot exceed 50 characters."),

  check("description")
    .notEmpty().withMessage("Product description is required."),

  check("image")
    .notEmpty().withMessage("Product image is required."),

  validatorMiddleware,
];

exports.updateProductValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 }).withMessage("Product name must be at least 2 characters long.")
    .isLength({ max: 50 }).withMessage("Product name cannot exceed 50 characters."),

  check("description")
    .optional(),

  check("image")
    .optional(),

  validatorMiddleware,
];
