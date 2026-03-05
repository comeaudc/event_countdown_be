import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    inviteToken: String,
    rsvp: {
      type: Boolean,
      default: null, // null = not responded yet
    },
  },
  { timestamps: true },
);

export default mongoose.model("Guest", guestSchema);
