import express from "express";
import { register } from "../controllers/UserController.js";

const  router=express.Router()

//Register User
router.post("/register",register)


export default router;