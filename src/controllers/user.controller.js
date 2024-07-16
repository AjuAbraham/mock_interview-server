import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ErrorHandler.js";
import ApiResponse from "../utils/ResponseHandler.js";

const userRegister = asyncHandler(async (req, res,next) => {
  const { username, email, password } = req.body;
  if ((!username, !email, !password)) {
    next(new ApiError(400, "all feild are necessary"));
  }
  const user = await User.findOne({ email });
  if (user) {
     next(new ApiError(409, "User already exsist"));
  }
  const newUser = await User.create({ username:username.toLowerCase(), email, password });

  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
     next(new ApiError(500, "Unable to register user"));
  } 
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Registered Successfully"));
});

const userLogin = asyncHandler(async (req, res,next) => {
   const {email,password} =req.body;
   if(!email|| !password){
    next(new ApiError(400,"All fields are required"));
   }
   const user = await User.findOne({email});
   if(!user){
    next(new ApiError(404,"User not found"));
   } 
   const isPasswordCorrect = await user.checkPassword(password);
   
   if(!isPasswordCorrect){
    next(new ApiError(401,"password is incorrect"))
   }
   const accessToken =  user.generateAccessToken();
   if(!accessToken){
    next(new ApiError(500,"Unable to generate accessToken"))
   }
   return res.status(200).json(new ApiResponse(200,{user,accessToken},"Logged in successfully"))
});

export { userRegister, userLogin };
