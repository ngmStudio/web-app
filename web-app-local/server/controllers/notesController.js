const Note = require("../models/Notes");

// Crear una nueva nota
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newNote = new Note({
      title,
      content,
      tags,
      userId: req.user.id, // Asegúrate de que el usuario esté autenticado
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la nota" });
  }
};


// Obtener todas las notas de un usuario
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No se encontraron notas" });
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las notas" });
  }
};

// Obtener una nota por ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la nota" });
  }
};

// Actualizar una nota
exports.updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la nota" });
  }
};

// Eliminar una nota
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    res.status(200).json({ message: "Nota eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la nota" });
  }
};
