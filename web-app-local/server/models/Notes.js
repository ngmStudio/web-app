const mongoose = require("mongoose");

const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image", "video", "drawing", "table", "sketch", "heading"],
    required: true,
  },
  content: mongoose.Schema.Types.Mixed, // pot ser text, urls, dades de taula, etc.
  position: Number,
});

const TagSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const NotesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  blocks: [ContentBlockSchema],
  tags: [TagSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notes", NotesSchema);