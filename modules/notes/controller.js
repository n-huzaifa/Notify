function getAllNotesController(req, res) {
  res.status(200).json({ ok: true });
}
function getNoteByIdController(req, res) {
  res.status(200).json({ ok: true });
}
function postNoteController(req, res) {
  res.status(200).json({ ok: true });
}
function updateNoteByIdController(req, res) {
  res.status(200).json({ ok: true });
}
function deleteNoteByIdController(req, res) {
  res.status(200).json({ ok: true });
}

module.exports = {
  getAllNotesController,
  getNoteByIdController,
  postNoteController,
  updateNoteByIdController,
  deleteNoteByIdController,
};
