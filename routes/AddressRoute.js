import express from "express";

import { Authenticated } from "../middleware/Auth.js";
import dotenv from "dotenv";
import { addAddress, getAddress } from "../controllers/AddressController.js";
dotenv.config();
const router = express.Router();


//add Address
router.post("/add",Authenticated,addAddress)

//get Address
router.get("/get",Authenticated,getAddress)

export default router;