import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import nodemailer from "nodemailer";

export const getOrders = async (req, res) => {
  try {
    const { email } = req.user.user;

    const user = await userModel.findOne({ email }).populate({
      path: "orders",
      populate: [
        {
          path: "medicines.medicine_id",
          model: "medicineModel",
        },
        {
          path: "location",
          model: "addressModel",
        },
      ],
      strictPopulate: false,
    });
    // console.log(user.orders);

    if (user) {
      if (user.orders) res.status(200).send(user.orders);
      else res.status(200).send([]);
    } else {
      return res.status(200).send("user not found");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};







export const getOrderById = async (req, res) => {
  try {
    // console.log('hello')
    const { id } = req.body; // ✅ get ID from URL params
    // id=new mongoose.Types.ObjectId(id);
    const order = await orderModel
      .findById(id)
      .populate({
        path: "medicines.medicine_id",
        model: "medicineModel",
      })
      .populate({
        path: "location",
        model: "addressModel",
      });
    // console.log(order);
    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(404).send("Order not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};






export const addOrders = async (req, res) => {
  try {
    // console.log("entry");
    const {  location, payment, status } = req.body;
    const user = await userModel.findOne({ email: req.user.user.email }).populate({
      path: "cart.medicine_id",
      strictPopulate: false,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const medicines = user.cart;
    let totalAmount = 0;
    medicines.forEach(
      (item) => (totalAmount += item.medicine_id.price * item.count)
    );
    payment.amount = totalAmount;

    const newOrder = new orderModel({
      medicines,
      user: user._id,
      location,
      payment,
      status,
    });
    await newOrder.save();

    // console.log(email.toString());
    // console.log("Email type:", typeof email, "Value:", email);

    user.orders = user.orders || [];
    user.orders.push(newOrder._id);
    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order added and linked to user",
      order: newOrder,
    });
    // console.log(newOrder);
    // Prepare HTML Invoice Content
    const invoiceHtml = `
      <h2 style="color:#2c3e50;">Thank You for Your Order! 🛒</h2>

<p>Dear Customer,</p>

<p>We're excited to let you know that your order has been successfully placed. Below are the details of your order:</p>

<hr />
        <h2>Invoice</h2>
        <p><strong>Order ID:</strong> ${newOrder._id}</p>
        <p><strong>Status:</strong> ${newOrder.status}</p>
        <p><strong>Payment Mode:</strong> ${newOrder.payment.mode}</p>
        <p><strong>Amount:</strong> ₹${newOrder.payment.amount * 8}</p>
        <p><strong>Payment Status:</strong> ${newOrder.payment.status}</p>
        <p><strong>Order Date:</strong> ${new Date(
          newOrder.createdAt
        ).toLocaleDateString()}</p>
        <p><strong>Expected Delivery:</strong> ${new Date(
          new Date(newOrder.createdAt).getTime() + 4 * 86400000
        ).toLocaleDateString()}</p>
        
        <h3>Medicines:</h3>
        <ul>
          ${newOrder.medicines
            .map(
              (item) =>
                `<li>${item.medicine_id?.name || "Unknown"} × ${
                  item.count
                } = ₹${item.medicine_id?.price * item.count * 8}</li>`
            )
            .join("")}
        </ul>
       
        <p>Visit our website to view or download your invoice</p>

      `;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chakrabortypremansu21@gmail.com",
        pass: "bgmfkgznokrzwblh", // App password
      },
    });

    await transporter.sendMail({
      from: '"Your Pharmacy" <chakrabortypremansu21@gmail.com>',
      to: req.user.user.email, // send to user email
      subject: "Your Pharmacy Invoice",
      html: invoiceHtml,
    });

    console.log("Invoice email sent to", req.user.user.email);
  } catch (err) {
    console.error("Order Error:", err);
    res.status(400).send(err.message);
  }
};






// export const updateOrderDetails = async (req, res) => {
//   try {
//     const { id } = req.body;

//     if (!id) {
//       return res.status(400).json({ message: 'Order ID is required' });
//     }

//     const updateData = req.body.updateData;

//     if (!updateData || typeof updateData !== 'object') {
//       return res.status(400).json({ message: 'Update data is invalid or missing' });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({
//       message: 'Order updated successfully',
//       updatedOrder,
//     });
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
