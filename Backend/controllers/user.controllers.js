import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import userModel from "../models/user.model.js";
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
    const user = await userModel.findOne({ email });

    if (user) {
      if (comparePassword(password, user.password)) {
        return res.status(200).json({
          data: {
            message: "Login successful",
            user: { email: user.email, name: user.name }, // Add additional user details here if needed
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
