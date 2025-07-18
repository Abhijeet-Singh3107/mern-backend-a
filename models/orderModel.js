import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [
    {
      productName: String,
      qty: Number,
      price: Number,
      _id: String,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "On the Way", "Delivered"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Order = mongoose.model("Order", orderSchema);
export default Order;
