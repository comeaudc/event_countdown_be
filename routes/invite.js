import express from "express";
import Guest from "../models/guestModel.js";
import error from "../utilities/error.js";

const router = express.Router();

// @route:  GET /api/invite/:token
// @desc:   Verify invite token and return guest info
router.get("/:token", async (req, res, next) => {
  try {
    const guest = await Guest.findOne({ inviteToken: req.params.token }).select(
      "name email rsvp",
    );

    if (!guest) return next(error(500, err.message));

    res.json(guest);
  } catch (err) {
    next(error(500, err.message));
  }
});

export default router;
