const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({ userId: req.userId });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener productos", error });
    }

};

exports.getProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Producto no encontrado" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener producto", error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body, userId: req.userId });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

exports.updateProduct = async (Request, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ message: "Producto no encontrado" });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
      const deletedOrder = await Product.findByIdAndDelete({
        _id: req.params.id,
        userId: req.userId,
      });
      if (!deletedOrder)
        return res.status(404).json({ message: "Producto no encontrado" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar producto", error });
    }
};