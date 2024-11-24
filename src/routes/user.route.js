import {Router} from 'express'
import { userLogin, userLogout, userRegister } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const userRouter =  Router();

userRouter.route('/register').post(userRegister)
userRouter.route('/login').post(userLogin)
userRouter.route('/logout').post(verifyJwt,userLogout)


export default userRouter;