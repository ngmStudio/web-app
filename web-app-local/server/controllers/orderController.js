const Order = require("../models/Order");

// Obtener todos los pedidos de un usuario
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos", error });
  }
};

// Obtener un pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!order)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      userId: req.userId,
    };

    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido", error });
  }
};

// Actualizar un pedido existente
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

// Borrar un pedido
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deletedOrder)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al borrar el pedido", error });
  }
};
