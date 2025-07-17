import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { email, items } = req.body;
    if (!email || !items || !items.length) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const newOrder = await Order.create({ email, items, status: "Pending" });
    res.status(201).json({ message: "Order saved", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error placing order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { email } = req.query;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: "Status updated", result });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};
