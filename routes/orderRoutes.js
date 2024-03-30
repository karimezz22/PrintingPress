const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticated, isAdmin } = require('../middleware/auth')

// Routes for order processing
router.get('/', authenticated, orderController.getAllOrders);
router.get('/acceptedOrderd', authenticated, orderController.getAllAcceptedOrders);
router.get('/orderHistory', authenticated, orderController.getOrderHistory);
router.get('/:id', authenticated, orderController.getOrderById);
router.post('/create', authenticated, orderController.createOrder);
router.put('/:id', authenticated, orderController.updateOrder);
router.delete('/:id', authenticated, orderController.deleteOrder);
router.put('/:id/accept', isAdmin, orderController.acceptOrder);
router.delete('/:id/deny', isAdmin, orderController.denyOrder);
router.put('/:id/status', isAdmin, orderController.changeOrderStatus);

module.exports = router;
