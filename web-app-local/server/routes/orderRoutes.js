const express = require('express');
const router = express.Router();
const orderController = requiere('../controllers/orderController');

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;