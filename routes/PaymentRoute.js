import express from "express";
import {
  UserOrder,
  allOrders,
  checkout,
  verify,
} from "../controllers/PaymentController.js";

import { Authenticated } from "./../middleware/Auth.js";

const router = express.Router();

// checkout
router.post("/checkout", checkout);

// verify payment and save in db
router.post("/verify-payment", verify);

//userOder
router.get("/userorder", Authenticated, UserOrder);

//userOder
router.get("/allorders", allOrders);

export default router;
