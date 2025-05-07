
import ambulanceModel from "../models/ambulance.model.js";


export const addAmbulance= async(req,res)=>{
    try{
      await ambulanceModel.create(req.body);
      res.status(200).send('New Ambulance added')
    }catch(err){
       res.status(400).send(err.message);
    }
}

export const getAmbulance = async(req,res)=>{
   try{
      const id=req.body.id;
      // console.log(id);
      if(id){
        const ambulance=await ambulanceModel.findOne({_id: id});
        res.status(200).json(ambulance);
      }else res.status(400).json('id is not defined');
   }catch(err){
     res.status(400).send(err.message)
   }
}

export const ambulanceCollection= async(req,res)=>{
  try{
      const ambulanceCollection=await ambulanceModel.find();
      res.status(200).json({
          data:ambulanceCollection,
      });
   }catch(err){
     res.status.send(err.message)
   }
}