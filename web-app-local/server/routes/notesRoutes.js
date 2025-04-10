const express = require('express');
const router = express.Router();
const notesController = requiere('../controllers/notesController');

router.get("/", notesController.getAllNotess);
router.get("/:id", notesController.getNotes);
router.post("/", notesController.createNotes);
router.put("/:id", notesController.updateNotes);
router.delete("/:id", notesController.deleteNotes);

module.exports = router;