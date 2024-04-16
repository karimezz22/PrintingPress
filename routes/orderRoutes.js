// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticated, isAdmin } = require('../middleware/auth');
const { createOrderValidator, updateOrderValidator } = require('../utils/validators/orderValidator');
const upload = require('../utils/fileUpload');

router.get('/', authenticated, orderController.getAllOrders);
router.get('/acceptedOrders', authenticated, orderController.getAllAcceptedOrders); // Updated route
router.get('/orderHistory/:user_id', authenticated, orderController.getOrderHistory);
router.get('/:id', authenticated, orderController.getOrderById);
router.post('/create', authenticated, upload.single('product[File]'), createOrderValidator, orderController.createOrder);
router.put('/:id', authenticated, upload.single('product[File]'), updateOrderValidator, orderController.updateOrder);
router.delete('/:id', authenticated, orderController.deleteOrder);
router.put('/:id/accept', isAdmin, orderController.acceptOrder);
router.delete('/:id/deny', isAdmin, orderController.denyOrder);
router.put('/:id/status', isAdmin, orderController.changeOrderStatus);

module.exports = router;