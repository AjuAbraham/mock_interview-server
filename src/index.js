/* eslint-disable no-undef */
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import dotenv from 'dotenv'


dotenv.config("./.env")
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:true
});

io.on("connection",()=>{
    console.log("connected")
})




server.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT||8000}`)
})  