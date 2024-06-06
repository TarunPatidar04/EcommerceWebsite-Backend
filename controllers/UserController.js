import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

// User register
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

//User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password / Crendentials",
        success: false,
      });
    }
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in login user",
      error: error.message,
    });
  }
};

// get All Users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All users",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in get all users",
      error: error.message,
    });
  }
};
