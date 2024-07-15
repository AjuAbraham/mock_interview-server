import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true,"username is required"],
      lowercase:true,
      trim:true, 
      index:true
    },
    email: {
      type: String,
      unique: true,
      lowercase:true,
      required: [true,"email is required"],
      
    },
    password: {
      type: String,
      unique: true,
      required: [true,"password is required"],
    },
    feedback: [
{
    type: Schema.Types.ObjectId,
    ref:"Feedback"
}
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
