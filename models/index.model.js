const mongoose=require('mongoose');


let indexSchema=mongoose.Schema({
// _id:mongoose.Schema.Types.ObjectId,
name:{type:String,require:true},
email:{type:String,require:true},
password:{type:String,require:true},
notes:[{
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    desc:String
}]

})


const indexModel=mongoose.model('user',indexSchema)
module.exports=indexModel