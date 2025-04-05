import { Users } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const handleUser = asyncHandler(async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "user.created") {
      const exsitingUser = await Users.findOne({
        clerkId: data.id,
      });
      if (exsitingUser) {
        return res.status(400).json({ message: "User already exsist" });
      }
      const newUser = await Users.create({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        username: data.username || "",
      });
      if (newUser) {
        return res
          .status(200)
          .json({ message: "User Created successfully", user: newUser });
      }
    } else if (type === "user.updated") {
      const updatedUser = await Users.findOneAndUpdate(
        { clerkId: data.id },
        {
          email: data.email_addresses[0]?.email_address,
          username: data.username || null,
        },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).json({
          message: "User Updated successfully",
          success: true,
          user: updatedUser,
        });
      }
    } else if (type === "user.deleted") {
      const deletedUser = await Users.deleteOne({ clerkId: data.id });
      if (deletedUser) {
        res.status(200).json({
          message: "User Deleted successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user_id = req.user;
  if (!user_id) {
    return res.status(400).json({ message: "User not provided" });
  }
  const user = await Users.findOne({ clerkId: user_id });
  if (!user) {
    return res.status(500).json({ message: "Unable to get user" });
  }
  return user;
});

export { handleUser, getUser };
