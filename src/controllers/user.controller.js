import {User} from "../models/user.model.js"
import asyncHandler  from  "../utils/asyncHandler.js"

const userRegister = asyncHandler(async(req,res)=>{
    const {email,}
})

const userLogin = asyncHandler(async(req,res)=>{
    res.status(200).json(({
        message: "ok"
    }))
})

export {userRegister,userLogin}