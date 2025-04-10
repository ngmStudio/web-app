const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");  

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    const {name, email, password, birthdate, address, postalCode, phone} = req.body;
    const userId = uuidv4();
    
    const newUser = new User({
      userId,
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
    res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
  }
}

//Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios", error: error.message });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

// Obtener un usuario por ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado", error: error.message });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};


// Actualizar la información del usuario
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, birthDate, address, postalCode, phone } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, birthDate, address, postalCode, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado", error: error.message });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el usuario",
        error: error.message,
      });
  }
};


// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado", error: error.message });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};