const Note = require("./../../model/noteModel");

async function getAllNotesController(req, res) {
  try {
    const data = await Note.find({});
    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}

async function getNoteByIdController(req, res) {
  try {
    const _id = req.params.id;
    const data = await Note.findOne({ _id: _id });

    if (!data) {
      res.status(200).json({ error: "Note doesn't exist" });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}

async function postNoteController(req, res) {
  try {
    const userId = req.user.userId;
    const data = await Note.create({
      userID: userId,
      title: req.body.title,
      content: req.body.content,
    });

    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}

async function updateNoteByIdController(req, res) {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;
    const data = await Note.findByIdAndUpdate(noteId, {
      userID: userId,
      title: req.body.title,
      content: req.body.content,
    });

    if (!data) {
      res.status(200).json({ error: "Note doesn't exist" });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}

async function deleteNoteByIdController(req, res) {
  try {
    const noteId = req.params.id;
    const data = await Note.findByIdAndDelete(noteId);

    if (!data) {
      res.status(200).json({ error: "Note doesn't exist" });
      return;
    }

    res.status(200).json({ ok: true });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}

module.exports = {
  getAllNotesController,
  getNoteByIdController,
  postNoteController,
  updateNoteByIdController,
  deleteNoteByIdController,
};
