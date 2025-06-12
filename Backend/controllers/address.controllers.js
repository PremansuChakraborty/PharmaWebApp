import userModel from "../models/user.model.js";
import addressModel from "../models/address.model.js";

export const getAddress = async(req,res)=>{
    try {
        const { email} = req.user.user;
        const user= await userModel.findOne({email}).populate({ path: 'address_ids', strictPopulate: false });
        // console.log(user);
        if(user.address_ids) res.status(200).send(user.address_ids);
        else res.status(200).send([]);
    }catch(err){
        res.status(400).send(err.message);
    }
}

export const addAddress = async (req, res) => {
  try {
    const { street, city, landmark, zip, state } = req.body;

    // Step 1: Find the user by email
    const user = await userModel.findOne({ email: req.user.user.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Step 2: Create a new address
    const newAddress = new addressModel({
      user_id: user._id,
      street,
      city,
      landmark,
      zip,
      state
    });

    await newAddress.save();

    // Step 3: Push address_id into the user's address_id array
    user.address_ids.push(newAddress._id);
    await user.save();

    res.status(201).json({
      message: "Address added and linked to user",
      address: newAddress
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
};
