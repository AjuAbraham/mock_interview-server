import { verifyToken } from "@clerk/clerk-sdk-node";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyWebhook } from "../utils/auth.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decodedToken = await verifyToken(token, {
      // eslint-disable-next-line no-undef
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decodedToken.sub;
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

export const verifyRequest = asyncHandler(async (req, res, next) => {
  let event;

  // Verify the webhook using the utility function
  try {
    event = verifyWebhook(req);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  req.event = event.type;
  req.data = event.data;
  next();
});
