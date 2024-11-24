import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import Jwt from 'jsonwebtoken';

export const verifyJwt  = asyncHandler(async(req,res,next)=>{
    try {
        const token =req.body.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(400).json({
                message:"Unauthorized access",
                success: false,
              });
        }     
        // eslint-disable-next-line no-undef
        const decodedToken = Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -feedback");
        if(!user){
            return res.status(401).json({
                message:"Invalid access token",
                success: false,
              });
        }
        req.user=user;
        next();
    } catch (error) {
       return;
    }
   })