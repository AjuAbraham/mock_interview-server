/* eslint-disable no-undef */
import mongoose from "mongoose";


 const dbConnect = async ()=>{
    try {
         await mongoose.connect(process.env.DATABASE_URI);
        console.log("MongoDb connected!!");
        
    } catch (error) {
        console.log("Database connection error",error);
        process.exit(1);
    }
}

export default dbConnect;