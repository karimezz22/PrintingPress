// models/cart.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    // Define cart schema fields here
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
