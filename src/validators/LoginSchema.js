import {z} from 'zod';

export const loginHandle = z.object({
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