import CartModel from "../models/CartModel.js";

//Add a product to the cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;

    const userId = "66615146f552e41e017f8a3b";
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({
        userId,
        items: [],
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      cart.items.push({ productId, title, price, qty, imgSrc });
    }

    await cart.save();
    res.status(200).json({
      message: "Item Added to Cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Add To Cart API",
      error: error.message,
    });
  }
};

// Retrieve the user specific cart
export const userCart = async (req, res) => {
  try {
    const userId = "66615146f552e41e017f8a3b";
    let cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json({
      message: "User Cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error user specific cart API",
      error: error.message,
    });
  }
};
