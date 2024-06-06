import express from "express";
import { addProduct } from "../controllers/ProductController.js";

const router = express.Router();

//Register User
router.post("/add", addProduct);

export default router;
