import express from "express";
import { tokenAuth } from "../middleware/tokenAuth.js";
import error from "../utilities/error.js";
const router = express.Router();

// @route: POST /api/rsvp
// @desc: Update RSVP
router.post("/", tokenAuth, async (req, res, next) => {
  const { attending } = req.body;
  if (typeof attending !== "boolean")
    next(error(400, "Attending must be boolean"));

  try {
    req.guest.rsvp = attending;

    await req.guest.save();

    res.json({ message: "RSVP Updated", rsvp: req.guest.rsvp });
  } catch (err) {
    console.error(err.message);
    next(error(400, "Server Error"));
  }
});

export default router;
