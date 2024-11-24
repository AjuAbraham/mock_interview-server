/* eslint-disable no-undef */
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {  handleRoom} from "./socket/config.js";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials:true
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
  
  io.on("connection", (socket) => {
      socket.on("room-info",(data)=>handleRoom(data,socket,io))
      socket.on("disconnect",()=>{
        console.log(`User disconnected: ${socket.id}`);
      })
  });
};

//routes
import userRouter from "./routes/user.route.js";

app.use('/api/v1/users',userRouter)



