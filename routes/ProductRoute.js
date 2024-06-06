import express from "express";
import { addProduct, getProducts } from "../controllers/ProductController.js";

const router = express.Router();

//Add Product
router.post("/add", addProduct);

//get all Product
router.get("/all", getProducts);

export default router;
