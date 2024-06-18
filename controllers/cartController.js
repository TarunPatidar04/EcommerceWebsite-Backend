import CartModel from "../models/CartModel.js";

//Add a product to the cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;

    const userId = req.user;
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
    const userId = req.user;
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

//Remove Product from cart
export const RemoveProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;

    let cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(
      (item) => item.productId.toString() != productId
    );
    await cart.save();
    res.status(200).json({
      message: "Product Remove From Cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Remove Product From Cart API",
      error: error.message,
    });
  }
};

//Remove Clear cart
export const ClearCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({ items: [] });
    } else {
      cart.items = [];
    }
    await cart.save();
    res.status(200).json({
      message: "Cart Clear",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error  Clear Cart API",
      error: error.message,
    });
  }
};

//Remove a product to the cart (Decrease quanity of cart)
export const decreaseProductQty = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const userId = req.user;

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
      const item = cart.items[itemIndex];

      if (item.qty > qty) {
        const pricePerUnit = item.price / item.qty;

        item.qty -= qty;
        item.price -= pricePerUnit * qty;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.json({ message: "Invalid Product Id" });
    }

    await cart.save();
    res.status(200).json({
      message: "Item Quantity Decresase to Cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in decrease Product Qty API",
      error: error.message,
    });
  }
};
