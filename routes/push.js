import express from "express";
import { tokenAuth } from "../middleware/tokenAuth.js";
import Guest from "../models/guestModel.js";
import error from "../utilities/error.js";

const router = express.Router();

router.post("/", tokenAuth, async (req, res, next) => {
  const { subscription } = req.body;

  if (!subscription) return next(error(400, "Subscription Required"));

  try {
    req.guest.pushSubscription = subscription;

    await req.guest.save();

    res.json({ message: "Push Subscription Saved" });
  } catch (error) {
    console.error(error);

    next(error(500, "Server Error"));
  }
});

export default router;
