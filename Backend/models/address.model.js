import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  landmark:{
    type:String,
    required:true
  },
  zip:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  
}, { timestamps: true });

const addressModel = mongoose.model('addressModel', AddressSchema);

export default addressModel
