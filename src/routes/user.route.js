import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import { validate } from "../middlewares/signup.middleware.js";
import { signUpHandle } from "../validators/signUpSchema.js";
import { loginHandle } from "../validators/LoginSchema.js";
const userRouter = Router();



userRouter.route('/register').post(upload.single(),validate(signUpHandle),registerUser);
userRouter.route('/login').post(upload.single(),validate(loginHandle),loginUser);


export default userRouter;