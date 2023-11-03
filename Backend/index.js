/* Imports */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

/* Backend connected to Environment Variables*/
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

/* Middlewares */
app.use(cors());
app.use(cookieParser());
app.use(express.json());

/* Routes for the Backend related to the Front End*/
app.use("/Backend/auth", authRoute);
app.use("/Backend/users", usersRoute);
app.use("/Backend/hotels", hotelsRoute);
app.use("/Backend/rooms", roomsRoute);

/* JSON Header Responses */

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8900, () => {
  connect();
  console.log("Connected Backend");
});
