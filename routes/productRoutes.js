//routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {  authenticated, isAdmin } = require('../middleware/auth');
const validatorMiddleware = require("../middleware/validatorMiddleware");


router.post('/create',         isAdmin,                      productController.createProduct);
router.get('/',          authenticated, validatorMiddleware, productController.getAllProducts);
router.get('/deletedProducts', isAdmin, validatorMiddleware, productController.getDeletedProducts);
router.get('/:id',       authenticated, validatorMiddleware, productController.getProductById);
router.put('/:id',             isAdmin,                      productController.updateProduct);
router.put('/:id',             isAdmin, validatorMiddleware, productController.deleteProduct);
router.put('/:id',             isAdmin, validatorMiddleware, productController.restoreProduct);
router.get('/search/:query', authenticated,                  productController.searchProducts);

module.exports = router;