const Objective = require("../models/Objective");

// Crear un nuevo objetivo
exports.createObjective = async (req, res) => {
  try {
    const { description, target, userId } = req.body;
    const newObjective = new Objective({
      description,
      target,
      userId: req.user.id, // Asegúrate de que el usuario esté autenticado
    });

    const savedObjective = await newObjective.save();
    res.status(201).json(savedObjective);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el objetivo" });
  }
};

// Obtener todos los objetivos de un usuario
exports.getObjectives = async (req, res) => {
  try {
    const objectives = await Objective.find({ userId: req.user.id });
    if (!objectives || objectives.length === 0) {
      return res.status(404).json({ message: "No se encontraron objetivos" });
    }
    res.status(200).json(objectives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los objetivos" });
  }
};

// Obtener un objetivo por id
exports.getObjective = async (req, res) => {
  try {
    const objective = await Objective.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!objective)
      return res.status(500).json({message: "Objetivo no encontrado", error});
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el objetivo", error });
  }
}

// Actualizar un objetivo
exports.updateObjective = async (req, res) => {
  try {
    const { description, target } = req.body;
    const updatedObjective = await Objective.findByIdAndUpdate(
      req.params.id,
      { description, target },
      { new: true }
    );

    if (!updatedObjective) {
      return res.status(404).json({ message: "Objetivo no encontrado" });
    }

    res.status(200).json(updatedObjective);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el objetivo" });
  }
};

// Eliminar un objetivo
exports.deleteObjective = async (req, res) => {
  try {
    const deletedObjective = await Objective.findByIdAndDelete(req.params.id);
    if (!deletedObjective) {
      return res.status(404).json({ message: "Objetivo no encontrado" });
    }
    res.status(200).json({ message: "Objetivo eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el objetivo" });
  }
};
