const router = require("express").Router();
const validator = require("./../../middleware/validator");
const { noteSchema } = require("../../validation/note");
const {
  getAllNotesController,
  getNoteByIdController,
  postNoteController,
  updateNoteByIdController,
  deleteNoteByIdController,
} = require("./controller");

router.get("/", getAllNotesController);
router.get("/:id", getNoteByIdController);
router.post("/", validator(noteSchema), postNoteController);
router.put("/:id", validator(noteSchema), updateNoteByIdController);
router.delete("/:id", deleteNoteByIdController);

module.exports = router;
