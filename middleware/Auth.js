import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");
  if (!token)
    return res.status(401).json({
      message: "Login required",
    });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // console.log(decoded);
  const id = decoded.userId;

  let user = await UserModel.findById(id);
  if (!user) {
    return res.status(401).json({
      message: "user not Exists",
    });
  }
  req.user = user;
  next();
};
