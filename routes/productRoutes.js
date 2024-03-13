const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// const authenticate = require('../middleware/authentication');
// const auth = require('../middleware/authorization');

// Routes for product management
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/create', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search/:query', productController.searchProducts);

module.exports = router;
