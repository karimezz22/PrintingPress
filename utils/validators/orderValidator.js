//utils/validators/orderValidator.js
const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Order = require("../../models/order");