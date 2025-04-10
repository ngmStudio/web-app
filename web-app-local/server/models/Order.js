const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  unitPrice: Number,
  totalPrice: Number,
  productionStatus: {
    type: String,
    enum: ["not_started", "in_progress", "done"],
    default: "not_started",
  },
  estimatedDeliveryDate: Date,
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderDate: { type: Date, default: Date.now },
  customerName: String,
  customerContact: String,
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "cancelled"],
    default: "pending",
  },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  notes: String,
  details: [OrderDetailSchema], // array d'elements del detall
});

module.exports = mongoose.model("Order", OrderSchema);