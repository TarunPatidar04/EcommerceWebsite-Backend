import express from "express";
import { addToCart, userCart } from "../controllers/cartController.js";
const router = express.Router();

//Add to Cart
router.post("/add", addToCart);


//get user  Cart
router.get("/user", userCart);

export default router;
