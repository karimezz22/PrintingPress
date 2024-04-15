const Product = require("../models/product");

const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;

    productData.image = req.file.path;

    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json({ message: "Product created successfully", data: savedProduct });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ deleted: false });
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
};

const getDeletedProducts = async (req, res, next) => {
  try {
    const deletedProducts = await Product.find({ deleted: true });
    res.json({ data: deletedProducts });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const toggleProductDeletedStatus = async (productId, deletedStatus, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, { deleted: deletedStatus }, { new: true });
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json({ message: "Product deleted status changed successfully" });
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    await toggleProductDeletedStatus(productId, true, res);
  } catch (error) {
    next(error);
  }
};

const restoreProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    await toggleProductDeletedStatus(productId, false, res);
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const query = req.params.query;
    const products = await Product.find({ $text: { $search: query } });
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getDeletedProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
  searchProducts,
};
