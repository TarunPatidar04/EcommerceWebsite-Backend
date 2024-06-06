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

//get Product by ID
export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      message: "One Product Fetched Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Get Product By API",
      error: error.message,
    });
  }
};

//Update Product by ID
export const updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Get Product By API",
      error: error.message,
    });
  }
};
