// index14.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);


// const dbuser = encodeURIComponent(process.env.MONGO_USER);
// const dbpass = encodeURIComponent(process.env.MONGO_PASS);

// const mernDB = "mernDB";  // atlas databse name...

// mongoose.connect(`mongodb://${dbuser}:${dbpass}@localhost:27017/lpu?authsource=admin`).then(() => {
//   app.listen(8080, () => {
//     console.log("Server started on port 8080...");
//   });
// });

mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.s42wzhx.mongodb.net/${mernDB}?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  app.listen(8080, () => {
    console.log("Server started on port 8080...");
  });
});
// testing


// mongoose.connect(`mongodb://localhost:27017/merncafe`).then(() => {
//   app.listen(8080, () => {
//     console.log("Server started on port 8080...");
//   });
// });






app.get("/",(req,res)=>{
  res.send("backend live...");
});
app.use("/api/users", userRouter);
