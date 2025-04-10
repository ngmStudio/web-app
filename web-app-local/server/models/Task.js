const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  task: { type: String, required: true },
  createdAt: {type: Date, default: Date.now},
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["pendiente", "completado", "en progreso"],
    default: "pendiente",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
