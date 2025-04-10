const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  description: String,
  type: {
    type: String,
    enum: ["marketing", "promotion"],
    default: "marketing",
  },
  motive: String, // navidad, lanzamiento, aniversario, etc.
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shop" }],
  relatedPromotions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  ], // si es de tipo marketing
  relatedCampaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }, // si es de tipo promotion
  goal: String, // objetivo de ventas o de impacto
  cost: Number,
  reach: Number, // o tipo de estimación del alcance
  startDate: Date,
  endDate: Date,
  active: { type: Boolean, default: true },
});
