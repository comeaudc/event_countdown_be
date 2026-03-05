import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String, default: "" },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Photo", photoSchema);
