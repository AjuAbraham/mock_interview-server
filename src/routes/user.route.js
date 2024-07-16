import {Router} from 'express'
import { userLogin, userRegister } from '../controllers/user.controller.js';

const userRouter =  Router();

userRouter.route('/sign-up').post(userRegister)
userRouter.route('/sign-in').post(userLogin)


export default userRouter;