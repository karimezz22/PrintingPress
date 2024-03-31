// controllers/productController.js
const productModel = require("../models/product");

const createProduct = async (req, res, next) => {
  try {
    // Implement to create product
    // Insert product information to the database
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    // Implement to get all products which deleted is false
  } catch (error) {
    next(error);
  }
};

const getDeletedProducts = async (req, res, next) => {
  try {
    // Implement to get products which deleted is true
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    // Implement to get a product by ID
  } catch (error) {
    next(error);
  }
};


const updateProduct = async (req, res, next) => {
  try {
    // Implement to update product
    // Update product information in the database
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    // Implement to delete product
    // set deleted attribute true
  } catch (error) {
    next(error);
  }
};

const restoreProduct = async (req, res, next) => {
  try {
    // Implement to delete product
    // set deleted attribute false
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    // Implement to search for products
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