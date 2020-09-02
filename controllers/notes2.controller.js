const NotesModel = require("../models/notes.model");
const usersModel = require("../models/index.model");
const mongoose=require('mongoose')
module.exports.addNote = async (req, res) => {
  const { title, desc } = req.body;

   await usersModel.findOne({_id:req.session.userID}).then((record)=>{
    record.notes.push({_id:mongoose.Types.ObjectId(),title,desc})
    record.save()
  })
 



 res.redirect('/home')
};


// 
