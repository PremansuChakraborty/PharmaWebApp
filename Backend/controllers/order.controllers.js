
import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

export const getOrders = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await userModel.findOne({ email }).populate({
        path: 'orders',
        populate: [
          {
            path: 'medicines.medicine_id',
            model: 'medicineModel'
          },
          {
            path: 'location',
            model: 'addressModel'
          }
        ],
        strictPopulate: false
      });
      console.log(user.orders);
  
      if (user) {
        if (user.orders) res.status(200).send(user.orders);
        else res.status(200).send([]);
      } else {
        return res.status(200).send('user not found');
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  export const getOrderById = async (req, res) => {
    try {
      console.log('hello')
      const { id } = req.body; // ✅ get ID from URL params
      // id=new mongoose.Types.ObjectId(id);
      const order = await orderModel
        .findById(id)
        .populate({
          path: 'medicines.medicine_id',
          model: 'medicineModel'
        })
        .populate({
          path: 'location',
          model: 'addressModel'
        });
      console.log(order);
      if (order) {
        return res.status(200).json(order);
      } else {
        return res.status(404).send('Order not found');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  

export const addOrders = async (req, res) => {
    try {
      const { email , location, payment, status } = req.body;
      const user = await userModel.findOne({ email }).populate({path: 'cart.medicine_id',strictPopulate: false});

    if (!user) {
      return res.status(404).send('User not found');
    }
    const medicines=user.cart;

    let totalAmount=0;
    medicines.map((item)=>totalAmount+=item.medicine_id.price*item.count);
    payment.amount=totalAmount;
  
      const newOrder = new orderModel({
        medicines,
        user:user._id,
        location,
        payment,
        status,
      });
      await newOrder.save();
  
      // Correct way to fetch a single user document
    //   const userID = new mongoose.Types.ObjectId(user);
    //   const foundUser = await userModel.find(email);
  
    //   if (!foundUser) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
  
      // Ensure orders is an array
      if (!Array.isArray(user.orders)) {
        user.orders = [];
      }
  
      user.orders.push(newOrder._id);
      user.cart = [];
      await user.save();
  
      res.status(201).json({
        message: "Order added and linked to user",
        order: newOrder,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  