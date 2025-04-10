const express = require('express');
const router = express.Router();
const objectiveController = requiere('../controllers/objectiveController');

router.get("/", objectiveController.getAllObjectives);
router.get("/:id", objectiveController.getObjective);
router.post("/", objectiveController.createObjective);
router.put("/:id", objectiveController.updateObjective);
router.delete("/:id", objectiveController.deleteObjective);

module.exports = router;