const Shop = require("../models/Shop");

// Crear una nueva tienda
exports.createShop = async (req, res) => {
  try {
    const { name, type, address, products } = req.body;
    const newShop = new Shop({
      name,
      type, // 'online' o 'physical'
      address,
      products,
      userId: req.user.id,
    });

    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la tienda" });
  }
};

// Obtener todas las tiendas de un usuario
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find({ userId: req.user.id });
    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: "No se encontraron tiendas" });
    }
    res.status(200).json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tiendas" });
  }
};

// Obtener una tienda por ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }
    res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la tienda" });
  }
};

// Actualizar una tienda
exports.updateShop = async (req, res) => {
  try {
    const { name, type, address, products } = req.body;
    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      { name, type, address, products },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    res.status(200).json(updatedShop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tienda" });
  }
};

// Eliminar una tienda
exports.deleteShop = async (req, res) => {
  try {
    const deletedShop = await Shop.findByIdAndDelete(req.params.id);
    if (!deletedShop) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }
    res.status(200).json({ message: "Tienda eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tienda" });
  }
};
