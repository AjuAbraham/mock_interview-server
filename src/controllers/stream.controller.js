/* eslint-disable no-undef */
import { StreamClient } from "@stream-io/node-sdk";
import asyncHandler from "../utils/asyncHandler.js";

export const getStreamToken = asyncHandler((req, res) => {
  const user = req.user;
  if (!user) return res.status(400).json({ message: "user id not found" });
  const streamClient = new StreamClient(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  );
  const token = streamClient.generateUserToken({ user_id: user });
  return res.status(200).json({ token });
});
