import { Router } from "express";
import { getUser, handleUser } from "../controllers/user.controller.js";
import { verifyJwt, verifyRequest } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/").post(verifyRequest, handleUser);
userRouter.route("/get").post(verifyJwt, getUser);
export default userRouter;
