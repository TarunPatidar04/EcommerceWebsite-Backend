import PaymentModel from "../models/PaymentModel.js";
import Razorpay from "razorpay";
const razorpay = new Razorpay({
  key_id: "rzp_test_q1OyBsAbEk77IE",
  key_secret: "VG4vi3kXkbXdVA4kGAGLxVDY",
});

//Add Address
export const checkout = async (req, res) => {
  try {
    const { amount, cartItem, userShipping, userId } = req.body;
    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `recept_${Date.now()}`,
    };

    // Create a new order using Razorpay's Orders API
    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order: ", order);
    res.json({
      order_id: order.id,
      amount: amount,
      currency: "INR",
      userId,
      cartItem,
      userShipping,
      payStatus: "created",
    });
  } catch (error) {
    console.error("error in Payment Controller", error);
    return res.status(500).json({ message: error.message });
  }
};

// verify  save to db
export const verify = async (req, res) => {
  try {
    const {
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
    } = req.body;

    let orderConfirm = await PaymentModel.create({
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
      payStatus: "paid",
    });
    console.log("Payment Confirmation: ", orderConfirm);

    res.json({
      message: "Payment Successful",
      success: true,
      orderConfirm,
    });
  } catch (error) {
    console.log("verify payment error", error);
  }
};

//user specific order
export const UserOrder = async (req, res) => {
  try {
    const userId = req.user._id.toString()
    // console.log("userId", userId);
    const Orders = await PaymentModel.find({ userId: userId }).sort({
      orderDate: -1,
    });
    // console.log("User Order: ", Orders);
    res.json(Orders);
  } catch (error) {
    console.error("error in getUserOrder", error);
    return res.status(500).json({ message: error.message });
  }
};



//user specific order
export const allOrders = async (req, res) => {
  try {
    const Orders = await PaymentModel.find().sort({
      orderDate: -1,
    });
    // console.log("User Order: ", Orders);
    res.json(Orders);
  } catch (error) {
    console.error("error in getUserOrder", error);
    return res.status(500).json({ message: error.message });
  }
};