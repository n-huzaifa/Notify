const Note = require("./../../model/noteModel");

async function getAllNotesController(req, res, next) {
  try {
    const userId = req.user.userId;
    const data = await Note.find({ userID: userId });
    res.status(200).json(data);
    return;
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

async function getNoteByIdController(req, res, next) {
  try {
    const _id = req.params.id;
    const data = await Note.findOne({ _id: _id });

    if (!data) {
      next({ status: 404, message: "Note doesn't exist" });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

async function postNoteController(req, res, next) {
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
    next({ status: 500, message: error.message });
  }
}

async function updateNoteByIdController(req, res, next) {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;
    const data = await Note.findByIdAndUpdate(noteId, {
      userID: userId,
      title: req.body.title,
      content: req.body.content,
    });

    if (!data) {
      next({ status: 404, message: "Note doesn't exist" });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

async function deleteNoteByIdController(req, res, next) {
  try {
    const noteId = req.params.id;
    const data = await Note.findByIdAndDelete(noteId);

    if (!data) {
      next({ status: 403, message: "Note doesn't exist" });
      return;
    }

    res.status(200).json({ ok: true });
    return;
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

module.exports = {
  getAllNotesController,
  getNoteByIdController,
  postNoteController,
  updateNoteByIdController,
  deleteNoteByIdController,
};
