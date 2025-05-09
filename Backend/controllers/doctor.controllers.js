import doctorModel from "../models/doctor.model.js";

export const addDoctor= async(req,res)=>{
    try{
      await doctorModel.create(req.body);
      res.status(200).send('New Doctor added')
    }catch(err){
       res.status(400).send(err.message);
    }
}

export const getDoctor = async(req,res)=>{
   try{
      const id=req.body.id;
      // console.log(id);
      if(id){
        const doctor=await doctorModel.findOne({_id: id});
        res.status(200).json(doctor);
      }else res.status(400).json('id is not defined');
   }catch(err){
     res.status(400).send(err.message)
   }
}

export const doctorCollection= async(req,res)=>{
  try{
      const doctorCollection=await doctorModel.find();
      res.status(200).json({
          data:doctorCollection,
      });
   }catch(err){
     res.status.send(err.message)
   }
}