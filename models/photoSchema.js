import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: {
      type: String,
      maxlength: 200,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Photo", photoSchema);
