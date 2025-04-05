import mongoose, { Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Content is required"],
    },
    description: {
      type: String,
      required: [true, "Content is required"],
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    StreamCallId: {
      type: String,
      required: true,
    },
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    interviewee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeseries: true }
);

export const Interview = mongoose.model("Interview", interviewSchema);
