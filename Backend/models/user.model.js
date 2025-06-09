import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.default.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
    unique: true,
  },
  address_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addressModel'
  }],
  cart: [
    {
      medicine_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicineModel',
        required: true,
      },
      count: {
        type: Number,
        default: 1,
        min: [1, 'Count must be at least 1'],
      }
    }
  ],
  orders: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderModel',
    }
  ],
  profile: {
    type: String,
    enum: ['user', 'doctor', 'nurse', 'ambulance','admin'],
    default: "user"
  }
}, { timestamps: true });

const userModel = mongoose.model("userModel", userSchema);
export default userModel;
