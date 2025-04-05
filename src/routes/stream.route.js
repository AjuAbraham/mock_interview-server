import { Router } from "express";
import { getStreamToken } from "../controllers/stream.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const StreamRouter = Router();

StreamRouter.get("/token", verifyJwt, getStreamToken);

export default StreamRouter;
