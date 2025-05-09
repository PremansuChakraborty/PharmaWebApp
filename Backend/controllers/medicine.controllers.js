import medicineModel from "../models/medicine.model.js"

export const addMedicine= async(req,res)=>{
      try{
        await medicineModel.create(req.body);
        res.status(200).send('New medicine added')
      }catch(err){
         res.status(400).send(err.message);
      }
}

export const getMedicine = async(req,res)=>{
     try{
        const id=req.body.id;
        // console.log(id);
        if(id){
          const medicine=await medicineModel.findOne({_id: id});
          res.status(200).json(medicine);
        }else res.status(400).json('id is not defined');
     }catch(err){
       res.status(400).send(err.message)
     }
}

export const medicineCollection= async(req,res)=>{
    try{
        const medicineCollection=await medicineModel.find();
        res.status(200).json({
            data:medicineCollection,
        });
     }catch(err){
       res.status.send(err.message)
     }
}
