import express from "express";
import {
  ClearCart,
  RemoveProductFromCart,
  addToCart,
  decreaseProductQty,
  userCart,
} from "../controllers/cartController.js";
const router = express.Router();

//Add to Cart
router.post("/add", addToCart);

//get user  Cart
router.get("/user", userCart);

//get user  Cart
router.delete("/remove/:productId", RemoveProductFromCart);

//Clear Cart
router.delete("/clear", ClearCart);

//Clear Cart
router.post("/--qty", decreaseProductQty);

export default router;
