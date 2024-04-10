import {z} from 'zod';

export const signUpHandle = z.object({
    username: z.
      string({required_error: "Name is required",
      invalid_type_error: "Name must be a string",})
      .min(2,{message : "Username must be atlest 5 character"})
      .max(30,{message : "Username must be upto 30 character"}),
    email: z.
      string({required_error: "Email is required"})
      .email({message:"Invalid Email address"})
      .min(10,{message:"Email must be of atleast 10 characters"})
      .max(20,{message:"Email must be upto 20 characters"}),
    password: z.
    string({required_error: "Password is required"})
    .min(6,{message:"Password must be of atleast 6 characters"})
    .max(15,{message:"Password must be upto 15 characters"})  
})