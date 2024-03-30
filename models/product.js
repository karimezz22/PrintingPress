//models/product.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    minlength: [2, "Product name must be at least 2 characters long."],
    maxlength: [50, "Product name cannot exceed 50 characters."]
  },
  description: {
    type: String,
    required: [true, "Product description is required."]
  },
  image: {
    type: String,
    required: [true, "Product image is required."]
  },
  requiredData: [{
    name: {
      type: String,
      required: [true, "Required data name is required."]
    },
    type: {
      type: String,
      enum: {
        values: ["text", "number", "dropdown"],
        message: "Invalid data type."
      },
      required: [true, "Type is required."]
    },
    required: {
      type: Boolean,
      default: false
    },
    choices: {
      type: [String]
    },
    
  }],
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
