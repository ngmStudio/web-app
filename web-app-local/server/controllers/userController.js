const User = require("../models/User");

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    const {name, email, password, birthdate, address, postalCode, phone} = req.body;
    const newUser = new User( {
      name,
      email,
      password,
      birthdate,
      address,
      postalCode,
      phone,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch(error){
    res.status(500).json({message: "Error al crear usuario"});
  }
}

//Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ userId: req.user.id });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};


// Actualizar la información del usuario
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};


// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};