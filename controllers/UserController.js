import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let userFind = await UserModel.findOne({ email });
    if (userFind) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in register user",
      error: error.message,
    });
  }
};
