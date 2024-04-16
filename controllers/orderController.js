const OrderModel = require("../models/order");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ accepted: false }).exec();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getAllAcceptedOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ accepted: true }).exec();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No accepted orders found.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const orders = await OrderModel.find({ user_id: userId }).exec();
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }
    
    res.status(200).json(orders);
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
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    let { user_id, product: { product_id, quantity, data } } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'File is required' });
    }
    const filePath = req.file.path;

    const product = { product_id, quantity, File: filePath, data };

    const newOrder = await OrderModel.create({ user_id, product });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { product: { quantity, data } = {}, status } = req.body;

    const existingOrder = await OrderModel.findById(orderId).exec();
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (existingOrder.accepted) {
      return res.status(400).json({ error: 'Cannot update accepted order' });
    }

    const updateFields = {};

    // Check and update quantity
    if (quantity !== undefined) {
      existingOrder.product.quantity = quantity;
    }

    // Check and update data
    if (data !== undefined && Array.isArray(data)) {
      existingOrder.product.data = data;
    }

    // Check and update file
    if (req.file && req.file.path) {
      existingOrder.product.File = req.file.path;
    }

    // Check and update status
    if (status !== undefined) {
      existingOrder.status = status;
    }

    const updatedOrder = await existingOrder.save();

    res.status(200).json(updatedOrder);
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
    return res.status(200).json({ message: 'Order deleted successfully' });
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
    
    res.status(200).json(order);
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
    return res.status(200).json({ message: 'Order denied successfully' });
  } catch (error) {
    next(error);
  }
};

const changeOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;

    if (!newStatus) {
      return res.status(400).json({ error: 'please enter the current status' });
    }
    const order = await OrderModel.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.status = newStatus;
    await order.save();
    res.status(200).json({ message: `The status changed successfully to "${newStatus}"` });
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
