import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:["true","Username is required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:["true","Password is required"],
    },
    email:{
        type:String,
        required:["true","Email is required"],
        unique:true,
    },
    googleId:String,
    avatar:String,
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))next();
    this.password =  bcrypt.hash(this.password,10);
    next();
} )


export const User = mongoose.model("User",userSchema);