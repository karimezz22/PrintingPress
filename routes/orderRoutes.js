// Routes for order processing
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/history', orderController.getOrderHistory);
router.get('/:id', orderController.getOrderById);

module.exports = router;
