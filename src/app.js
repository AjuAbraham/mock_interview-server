/* eslint-disable no-undef */
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Config middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

export const server = createServer(app);
let io;

export const initializeSocket = () => {
  io = new Server(server, {
    cors: true,
  });
  
  io.on("connection", () => {
    console.log("connected");
  });
};

//routes
import userRouter from "./routes/user.route.js";

app.use('/api/v1/users/',userRouter)



// error handler
app.use((err, _, res ) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message,
    success: false,
  })
});
