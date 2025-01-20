import mongoose from "mongoose";

const ambulanceSchema= new mongoose.Schema({

    // {
    //     "_id": "1",
    //     "location": "New Delhi",
    //     "distance": "5 km",
    //     "contact": "9999888777",
    //     "imageLink": "https://www.winger-tatamotors.com/images/multi-purpose-vehicle/tata-winger-ambulance/overview/Ambulance.png",
    //     "Driver name": "Rajesh Sharma"
    //   }

    location:{
        type:String,
        required: true
    },
    distance:{
        type: String
    },
    contact_number:{
        type:String,
        required: true
    },
    imageLink:{
        type:String,
        required: true
    },
    driver_name:{
        type:String,
        required: true
    }
})

const ambulanceModel= new mongoose.model('ambulanceModel', ambulanceSchema)

export default ambulanceModel