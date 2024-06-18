import express from "express";
import {
  ClearCart,
  RemoveProductFromCart,
  addToCart,
  decreaseProductQty,
  userCart,
} from "../controllers/cartController.js";
import { Authenticated } from "../middleware/Auth.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

//Add to Cart
router.post("/add", Authenticated, addToCart);

//get user  Cart
router.get("/user", Authenticated, userCart);

//get user  Cart
router.delete("/remove/:productId", Authenticated, RemoveProductFromCart);

//Clear Cart
router.delete("/clear", Authenticated, ClearCart);

//Clear Cart
router.post("/--qty", Authenticated, decreaseProductQty);

export default router;
