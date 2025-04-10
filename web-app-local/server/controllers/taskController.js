const Task = require("../models/Task");

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      deadline,
      userId: req.user.id, // Asegúrate de que el usuario esté autenticado
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

// Obtener todas las tareas de un usuario
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No se encontraron tareas" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, deadline },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};
