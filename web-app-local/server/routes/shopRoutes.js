const express = require('express');
const router = express.Router();
const shopController = requiere('../controllers/shopController');

router.get("/", shopController.getAllShops);
router.get("/:id", shopController.getShop);
router.post("/", shopController.createShop);
router.put("/:id", shopController.updateShop);
router.delete("/:id", shopController.deleteShop);

module.exports = router;