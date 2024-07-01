import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserRouter from "./routes/UserRoute.js";
import ProductRouter from "./routes/ProductRoute.js";
import CartRouter from "./routes/CartRoute.js";
import AddressRoute from "./routes/AddressRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb Connected Successfully!");
  })
  .catch((error) => {
    console.log("mongodb connection error : ", error);
  });

//User Router
app.use("/api/user", UserRouter);

//Product Router
app.use("/api/product", ProductRouter);

//Cart Router
app.use("/api/cart", CartRouter);

//Address Router
app.use("/api/address", AddressRoute);

//Payment Router
app.use("/api/payment", PaymentRoute);



app.get("/", (req, res) => {
  res.json({
    message: "This is Ecommerce Website",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
