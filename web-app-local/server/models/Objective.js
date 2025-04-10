const mongoose = require("mongoose");

const ObjectiveSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: {type: Date, default: Date.now},
  deadline: { type: Date },
  progress: { type: Number, default: 0 }, // Porcentaje de progreso
  relatedShop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }, // Tienda relacionada (si es aplicable)
});

module.exports = mongoose.model("Objective", ObjectiveSchema);
