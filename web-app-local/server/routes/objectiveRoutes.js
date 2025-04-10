const express = require('express');
const router = express.Router();
const objectiveController = require('../controllers/objectiveController');

router.get("/", objectiveController.getObjectives);
router.get("/:id", objectiveController.getObjective);
router.post("/", objectiveController.createObjective);
router.put("/:id", objectiveController.updateObjective);
router.delete("/:id", objectiveController.deleteObjective);

module.exports = router;

