//utils/validators/orderValidator.js
const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Product = require("../../models/product");

const createOrderValidator = [
  check('product').notEmpty().withMessage('Product is required.').isObject().withMessage('Product must be an object'),
  check('product.quantity').notEmpty().withMessage('Quantity is required.').isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
  check('product.data').isArray({ min: 1 }).withMessage('Product data must be an array with at least one element.')
    .custom((value, { req }) => {
      if (!value.every(item => item.field_name && item.value)) {
        throw new Error('Each product data item must have a field_name and a value');
      }
      return true;
    }),

  validatorMiddleware
];


const updateOrderValidator = [
  check('product.quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
  check('product.PDF').optional(),
  check('product.data').optional().isArray({ min: 1 }).withMessage('Product data must be an array with at least one element.')
    .custom((value, { req }) => {
      if (!value.every(item => item.field_name && item.value)) {
        throw new Error('Each product data item must have a field_name and a value');
      }
      return true;
    }),

  validatorMiddleware
];

module.exports = {
  createOrderValidator,
  updateOrderValidator
};
