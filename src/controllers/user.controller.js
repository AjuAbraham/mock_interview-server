import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username, !email, !password)) {
   return res.status(400).json({
      message: "All fields are required",
      success: false,
    });;
  }
  const user = await User.findOne({ email });
  if (user) {
     return res.status(409).json({
      message:  "User already exsist",
      success: false,
    });
  }
  const newUser = await User.create({ username:username.toLowerCase(), email, password });

  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
    return res.status(500).json({
      message: "Unable to register user",
      success: false,
    });
  } 
  return res
    .status(201)
    .json({createdUser, message:"Registered Successfully"});
});

const userLogin = asyncHandler(async (req, res) => {
   const {email,password} =req.body;
   if((!email || !password)){
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
   }
   const user = await User.findOne({email});
   if(!user){
    return res.status(500).json({
      message: "Unable to find User",
      success: false,
    });;
   } 
   const isPasswordCorrect = await user.checkPassword(password);
   
   if(!isPasswordCorrect){
    return res.status(400).json({
      message:"password is incorrect",
      success: false,
    });
   }
   const accessToken =  user.generateAccessToken();
   if(!accessToken){
    return  res.status(500).json({
      message:"Unable to generate accessToken",
      success: false,
    });
   }
   return res.status(200).json({accessToken,message:"Logged in successfully"})
});

const userLogout = asyncHandler(async (req, res) => {
 
  const user = req.user;
  if(!user){
   return res.status(404).json({
    message:"Unauthorized access",
    success: false,
  });
  } 
  const logOutUser = await User.findByIdAndUpdate(user._id,{accessToken:''},{new:true});
  if(!logOutUser){
    return res.status(500).json({
      message:"Unable to logout user",
      success: false,
    });
  }
  return res.status(200).json({message:"Logged out successfully"})
});


export { userRegister, userLogin ,userLogout};
