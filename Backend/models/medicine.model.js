import mongoose from "mongoose";

const medicineSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageLink:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
    },
    stock:{
        type: Number
    }
})

const medicineModel=new mongoose.model('medicineModel', medicineSchema);

export default medicineModel