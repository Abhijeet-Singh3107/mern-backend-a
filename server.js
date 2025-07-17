import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Change this to your frontend domain in production
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Atlas Connection (Production)
const dbuser = encodeURIComponent(process.env.MONGO_USER);
const dbpass = encodeURIComponent(process.env.MONGO_PASS);
const dbname = "mernDB"; // Replace with your actual DB name

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.s42wzhx.mongodb.net/${dbname}?retryWrites=true&w=majority&`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("✅ Server started on port 8080...");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// Local MongoDB (for development/testing)
// mongoose.connect("mongodb://localhost:27017/merncafe")
//   .then(() => {
//     app.listen(8080, () => {
//       console.log("✅ Local server running on port 8080...");
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Local MongoDB connection failed:", err.message);
//   });

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
