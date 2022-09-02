const mongoose=require("mongoose");

const recordDataSchema= new mongoose.Schema({
  userId:{type:String,required:true},
  name:{type:String,required:true},
  student_code:{type:String,required:true},
  topic:{type:String,required:true},
  content:{type:String,required:true},
  time:{type:String,required:true},
})

const RecordDataModel=mongoose.model("recordData",recordDataSchema);

module.exports=RecordDataModel;