import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import userModel from "../models/user.model.js";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checking = await userModel.findOne({ email: req.body.email });

    if (checking) {
      // If the user already exists
      return res.send("User details already exist");
    }
    const user = await userModel.create({
      email,
      name,
      password: hashPassword(password),
    });
    return res.status(200).json({
      data: {
        email: user.email,
        name: user.name,
      },
      success: true,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email }).populate('doctorId');

    // console.log(user);

    if (user) {
      if (comparePassword(password, user.password)) {
        const token=jwt.sign({user},process.env.SECRET_KEY)
        res.cookie('auth',token,{
          maxAge:7*24*60*60*1000,
          sameSite:'Lax',
          secure:false,
          httpOnly:true
        })
        return res.status(200).json({
          data: {
            message: "Login successful",
            user: user,
          },
          success: true,
        });
      } else {
        return res.status(401).send("User not found");
      }
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const checkauth=(req,res)=>{
    // console.log(req.user)
    return res.status(200).json({data: {
            message: "Valid Token Login successful",
            user: req.user.user,
          }});
}

export const logout=(req,res)=>{
  res.clearCookie('auth',{
    httpOnly:true,
    secure:false,
    sameSite:'Lax'
  })
  res.status(200).send('Logout Successful')
}









export const addToCart = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findOne({email: req.user.user.email });

    if (!user) return res.status(404).send('User not found');

    const medicineObjectId = new mongoose.Types.ObjectId(id);

    const existingItem = user.cart.find(
      (item) =>
        item.medicine_id &&
        item.medicine_id.equals(medicineObjectId)
    );

    if (existingItem) {
      existingItem.count += 1;
    } else {
      user.cart.push({ medicine_id: medicineObjectId, count: 1 });
    }

    await user.save();

    res.status(200).json({
      message: "Product added",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
};


  

export const getCart = async (req, res) => {
  try {
    const { email } = req.user.user;

    const user = await userModel.findOne({ email }).populate({path: 'cart.medicine_id',strictPopulate: false});

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user.cart || []);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
};


export const reduceCount=async(req,res)=>{
  try {
    const { id } = req.body;
    const user = await userModel.findOne({ email:req.user.user.email });

    if (!user) return res.status(404).send('User not found');

    const medicineObjectId = new mongoose.Types.ObjectId(id);

    const existingItem = user.cart.find(
      (item) =>
        item.medicine_id &&
        item.medicine_id.equals(medicineObjectId) && item.count>1
    );

    if (existingItem) {
      existingItem.count -= 1;
    } else {
      return res.status(400).send('product not found');
    }

    await user.save();

    res.status(200).json({
      message: "Product count reduce",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
}

export const deleteProduct=async(req,res)=>{
  try {
    const { id } = req.body;
    const user = await userModel.findOne({ email:req.user.user.email });

    if (!user) return res.status(404).send('User not found');

    const medicineObjectId = new mongoose.Types.ObjectId(id);

    const newItems = user.cart.filter(
        (item) => !(item.medicine_id && item.medicine_id.equals(medicineObjectId))
    );

   user.cart=newItems;

    await user.save();

    res.status(200).json({
      message: "Product deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
}