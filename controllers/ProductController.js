import ProductModel from "../models/ProductModel.js";

// add Product
export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, qty, imgSrc } = req.body;
    let product = await ProductModel.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Add Product API",
      error: error.message,
    });
  }
};

//get Products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Products Fetched Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Get Product API",
      error: error.message,
    });
  }
};
