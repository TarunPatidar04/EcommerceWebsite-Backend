import express from "express";
import { getAllUsers, login, register } from "../controllers/UserController.js";

const router = express.Router();

//Register User
router.post("/register", register);

//Login user
router.post("/login", login);

//get ALL user
router.get("/all", getAllUsers);

export default router;
