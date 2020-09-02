const NotesModel = require("../models/notes.model");
const mongoose=require('mongoose')
module.exports.addNote = async (req, res) => {
  const { title, desc } = req.body;

  const note = new NotesModel({

    _id:mongoose.Types.ObjectId(),
    title,
    desc,
    UserID: req.session.userID
  });

 await note.save();
 res.redirect('/home')
};
