// utils/verifyWebhook.js
import { Webhook } from "svix";

export const verifyWebhook = (req) => {
  // eslint-disable-next-line no-undef
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined in environment variables");
  }

  const headers = req.headers;
  const payload = req.body;

  // Verify the webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  try {
    const event = wh.verify(JSON.stringify(payload), {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"],
    });
    return event; // Return the verified event
  } catch (err) {
    throw new Error(`Webhook verification failed: ${err.message}`);
  }
};