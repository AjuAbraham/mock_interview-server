import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
  {
   content:{
    type:String,
    required:[true,"Content is required"]
   },
   rating:{
    type:Number,
   },
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
   },
   interviewee:{
    type:Schema.Types.ObjectId,
    ref:"User"
   }
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
