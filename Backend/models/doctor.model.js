import mongoose from "mongoose";

const doctorSchema= new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        specialization:{
            type: String,
            required: true
        },
        imageLink:{
            type: String,
            required: true
        },
        experience:{
            type: Number,
            required: true
        },
        contact_number:{
            type: Number,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        email:{
            type: String,
        },
        description:{
            type: String,
        },
        doctorJoiningLink:{
            type: String,
        },
        userJoiningLink:{
            type: String,
        },
})

const doctorModel=new mongoose.model('doctorModel', doctorSchema)

export default doctorModel