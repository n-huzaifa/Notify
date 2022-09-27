const router = require("express").Router();
const {
  getAllNotesController,
  getNoteByIdController,
  postNoteController,
  updateNoteByIdController,
  deleteNoteByIdController,
} = require("./controller");

router.get("/", getAllNotesController);
router.get("/", getNoteByIdController);
router.post("/", postNoteController);
router.put("/", updateNoteByIdController);
router.delete("/", deleteNoteByIdController);

module.exports = router;
