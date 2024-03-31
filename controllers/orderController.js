//controllers/orderController.js
const OrderModel = require("../models/order");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ accepted: false }).exec();
    // Retrieve all orders where accepted is false

    res.json(orders); // Send the retrieved orders as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const getAllAcceptedOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ accepted: true }).exec();
    // Retrieve all orders where accepted is true

    res.json(orders); // Send the retrieved orders as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const getOrderHistory = async (req, res, next) => {
  try {
    // Assuming you have access to the user's ID from the request
    const userId = req.user._id; // Replace with the actual way to get the user ID from the request

    // Query the OrderModel to find orders associated with the user
    const orders = await OrderModel.find({ user_id: userId }).exec();

    res.json(orders); // Send the retrieved orders as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a parameter in the request URL

    // Query the OrderModel to find the order by its ID
    const order = await OrderModel.findById(orderId).exec();

    if (!order) {
      // If no order is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order); // Send the retrieved order as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { user_id, product, total_cost } = req.body; // Assuming required fields are passed in the request body

    // Create a new order using the OrderModel
    const newOrder = await OrderModel.create({
      user_id,
      product,
      total_cost
      // You may need to include other fields as well depending on your schema
    });

    res.status(201).json(newOrder); // Send the newly created order as a JSON response with status code 201 (Created)
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a parameter in the request URL
    const updateData = req.body; // Data to update, assuming it's passed in the request body

    // Find and update the order by its ID
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId }, // Filter: find order by ID
      updateData, // Data to update
      { new: true } // Options: return the updated document
    ).exec();

    if (!updatedOrder) {
      // If no order is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder); // Send the updated order as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a parameter in the request URL

    // Find and delete the order by its ID
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId).exec();

    if (!deletedOrder) {
      // If no order is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(deletedOrder); // Send the deleted order as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const acceptOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a parameter in the request URL

    // Find the order by its ID
    const order = await OrderModel.findById(orderId).exec();

    if (!order) {
      // If no order is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Order not found' });
    }

    // Calculate the total cost of the order
    let totalCost = 0;
    order.product.forEach(item => {
      totalCost += item.quantity * item.unit_price;
    });

    // Update the order to set accepted to true and update total_cost
    order.accepted = true;
    order.total_cost = totalCost;
    await order.save();

    res.json(order); // Send the updated order as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};


const denyOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a parameter in the request URL

    // Find and delete the order by its ID
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId).exec();

    if (!deletedOrder) {
      // If no order is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(deletedOrder); // Send the deleted order as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const changeOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed as a parameter in the request URL
    const newStatus = req.body.status; // Assuming the new status is passed in the request body

    // Find the order by its ID
    const order = await OrderModel.findById(orderId).exec();

    if (!order) {
      // If no order is found with the given ID, return a 404 error
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the status of the order
    order.status = newStatus;
    await order.save();

    res.json(order); // Send the updated order as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};



module.exports = {
  getAllOrders,
  getAllAcceptedOrders,
  getOrderHistory,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  acceptOrder,
  denyOrder,
  changeOrderStatus
};
