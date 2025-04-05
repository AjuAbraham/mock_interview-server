import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import StreamRouter from "./routes/stream.route.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

dotenv.config();
const app = express();
const authMiddleware = ClerkExpressWithAuth();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Config middlewares
app.use(authMiddleware);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes

app.use("/api/webhooks", userRouter);
app.use("/api/v1/stream", StreamRouter);

export default app;
