//utils/validators/orderValidator.js
const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Order = require("../../models/order");
const Product = require("../../models/product");

exports.createOrderValidator = [
  check("user_id")
    .notEmpty().withMessage("User ID required"),

  check("product.product_id")
    .notEmpty().withMessage("Product ID required")
    .custom(async (value, { req }) => {
      const product = await Product.findById(value);
      if (!product) {
        throw new Error("Invalid product ID.");
      }
    }),

  check("product.quantity")
    .notEmpty().withMessage("Quantity required")
    .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),

  check("product.PDF")
    .notEmpty().withMessage("PDF link required"),

  check("status")
    .optional(), // Making status optional for order creation

  check("total_cost")
    .notEmpty().withMessage("Total cost required")
    .isFloat({ min: 0 }).withMessage("Total cost must be a positive number"),

  validatorMiddleware,
];

exports.updateOrderValidator = [
  check("status")
    .optional(), // Making status optional for order update

  check("accepted")
    .optional(), // Making accepted optional for order update

  check("total_cost")
    .optional(), // Making total_cost optional for order update

  validatorMiddleware,
];
