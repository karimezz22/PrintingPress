const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const authenticate = require('../middleware/authentication');
// const auth = require('../middleware/authorization');

// Routes for order processing
router.get('/', orderController.getAllOrders);
router.get('/acceptedOrderd', orderController.getAllAcceptedOrders);
router.get('/orderHistory', orderController.getOrderHistory);
router.get('/:id', orderController.getOrderById);
router.post('/create', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id/accept', orderController.acceptOrder);
router.delete('/:id/deny', orderController.denyOrder);
router.put('/:id/status', orderController.changeOrderStatus);

module.exports = router;
