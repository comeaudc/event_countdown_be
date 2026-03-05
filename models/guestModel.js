import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, default: "" }, // optional
    inviteToken: { type: String, required: true },
    rsvp: { type: Boolean, default: null },
    pushSubscription: { type: Object, default: null }, // for PWA notifications
  },
  { timestamps: true },
);

export default mongoose.model("Guest", guestSchema);
