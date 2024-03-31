// controllers/productController.js
const productModel = require("../models/product");

const getAllProducts = async (req, res, next) => {
  try {
    // Find all products where deleted is false
    const products = await ProductModel.find({ deleted: false }).exec();

    res.json(products); // Send the products as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const getDeletedProducts = async (req, res, next) => {
  try {
    // Find products where deleted is true
    const deletedProducts = await ProductModel.find({ deleted: true }).exec();

    res.json(deletedProducts); // Send the deleted products as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a parameter in the request URL

    // Find the product by its ID
    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      // If no product is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product); // Send the product as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};


const createProduct = async (req, res, next) => {
  try {
    // Extract product information from the request body
    const { name, description, image, requiredData } = req.body;

    // Create a new product instance
    const newProduct = new ProductModel({
      name,
      description,
      image,
      requiredData
    });

    // Save the new product to the database
    const createdProduct = await newProduct.save();

    res.status(201).json(createdProduct); // Send the created product as a JSON response with status code 201 (Created)
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};


const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a parameter in the request URL
    const updateData = req.body; // Assuming the updated product data is passed in the request body

    // Find the product by its ID and update its information
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true }).exec();

    if (!updatedProduct) {
      // If no product is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct); // Send the updated product as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a parameter in the request URL

    // Find the product by its ID and set its deleted attribute to true
    const deletedProduct = await ProductModel.findByIdAndUpdate(productId, { deleted: true }, { new: true }).exec();

    if (!deletedProduct) {
      // If no product is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(deletedProduct); // Send the deleted product as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const { keyword } = req.query; // Assuming the search keyword is passed as a query parameter

    // Define the search criteria
    const searchCriteria = {
      $or: [
        { name: { $regex: keyword, $options: 'i' } }, // Search product name case-insensitively
        { description: { $regex: keyword, $options: 'i' } }, // Search product description case-insensitively
      ]
    };

    // Perform the search query
    const searchResults = await ProductModel.find(searchCriteria).exec();

    res.json(searchResults); // Send the search results as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};


module.exports = {
  getAllProducts,
  getDeletedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};