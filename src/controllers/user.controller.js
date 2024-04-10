import AsyncHandler from '../utils/AsyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js';

const registerUser = AsyncHandler(async (req,res)=>{
    const {username,email,password} =  req.body;
    if(!username || !email || !password ){
         next(new ApiError(400,"All field are required"));
    }
    const exsistedUser = await User.findOne({
        $or:[{username} , {email}]
    })
    if(exsistedUser){
        next(new ApiError(409,"User already exsist"));
    }
   const user = await User.create({
    username,
    email,
    password,
   })
   const findUser = await User.findById(user?._id).select("-googleId");
   if(!findUser){
    next( new ApiError(500,"Unable to register user"));
   }
   return res.status(200).json(
     new ApiResponse(200,findUser,"User registerd successfully")
   )
})

const loginUser = AsyncHandler (async (req,res)=>{})

export {registerUser,loginUser}