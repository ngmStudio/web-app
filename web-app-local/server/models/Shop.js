const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["física", "online"], required: true }, // Tienda física u online
  location: { type: String }, 
  url: { type: String }, 
});

module.exports = mongoose.model("Shop", ShopSchema);