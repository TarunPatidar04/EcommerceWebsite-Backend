import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoute.js";
dotenv.config();
const app = express();

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

app.get("/", (req, res) => {
  res.json({
    message: "This is Ecommerce Website",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
