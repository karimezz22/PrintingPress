//controllers/orderController.js
const OrderModel = require("../models/order");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ accepted: false }).exec();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getAllAcceptedOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ accepted: true }).exec();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await OrderModel.find({ user_id: userId }).exec();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity, PDF, data } = req.body;

    PDF = req.file.path;
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const product = {
      product_id,
      quantity,
      PDF,
      data
    };

    // Create the order with the product details
    const newOrder = await OrderModel.create({
      user_id,
      product
      });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const updateData = req.body;
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      updateData,
      { new: true }
    ).exec();
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId).exec();
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(deletedOrder);
  } catch (error) {
    next(error);
  }
};

const acceptOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { totalCost } = req.body;
    
    const order = await OrderModel.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (!totalCost) {
      return res.status(400).json({ error: 'Total cost is required' });
    }
    
    order.accepted = true;
    order.total_cost = totalCost;
    await order.save();
    
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const denyOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId).exec();
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(deletedOrder);
  } catch (error) {
    next(error);
  }
};

const changeOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    const order = await OrderModel.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.status = newStatus;
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
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

