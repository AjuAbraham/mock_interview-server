/* eslint-disable no-undef */
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.ORIGIN
}));

// Config middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

export const server = createServer(app);
let io;

export const initializeSocket = () => {
    io = new Server(server, {
        cors: true
    });

    io.on("connection", () => {
        console.log("connected");
    });
};
