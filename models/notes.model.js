const mongoose=require('mongoose');


let notesSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
title:{type:String,require:true},
desc:{type:String,require:true},
UserID:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})

module.exports=mongoose.model('note',notesSchema)