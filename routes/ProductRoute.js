import express from "express";
import { addProduct, deleteProductsById, getProducts, getProductsById, updateProductsById } from "../controllers/ProductController.js";

const router = express.Router();

//Add Product
router.post("/add", addProduct);

//get all Product
router.get("/all", getProducts);

//get Product by Id
router.get("/:id", getProductsById);


//update Product by Id
router.put("/:id", updateProductsById);

//delete Product by Id
router.delete("/:id", deleteProductsById);

export default router;
