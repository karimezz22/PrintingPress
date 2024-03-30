//routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {  authenticated, isAdmin } = require('../middleware/auth')

router.get('/', authenticated, productController.getAllProducts);
router.get('/', isAdmin, productController.getDeletedProducts);
router.get('/:id', authenticated, productController.getProductById);
router.post('/create', isAdmin, productController.createProduct);
router.put('/:id', isAdmin, productController.updateProduct);
router.delete('/:id', isAdmin, productController.deleteProduct);
router.get('/search/:query', authenticated, productController.searchProducts);

module.exports = router;
