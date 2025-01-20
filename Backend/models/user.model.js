import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate:[validator.default.isEmail,"please enter valid email"]

  },
  password: {
    type: String,
    required: true,
  }
});

const userModel = new mongoose.model("userModel", userSchema);
export default  userModel;