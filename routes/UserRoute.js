import express from "express";
import {
  getAllUsers,
  login,
  profile,
  register,
} from "../controllers/UserController.js";
import { Authenticated } from "../middleware/Auth.js";

const router = express.Router();

//Register User
router.post("/register", register);

//Login user
router.post("/login", login);

//get ALL user
router.get("/all", getAllUsers);

//getUser  Profile
router.get("/profile", Authenticated, profile);

export default router;
