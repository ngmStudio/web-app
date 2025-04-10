const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  productType: { type: String, enum: ["producto", "servicio"], required: true },
  media: [{ type: String }], // Lista de fotos/videos
  shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shop" }], // Tiendas donde está
  campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }], // Campañas relacionadas
});

module.exports = mongoose.model("Product", ProductSchema);