import express from "express";
import { addToCart } from "../controllers/cartController.js";
const router = express.Router();

//Add to Cart
router.post("/add", addToCart);

export default router;
