const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: Date },
  address: { type: String },
  postalCode: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
