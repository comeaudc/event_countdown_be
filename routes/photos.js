// routes/photos.js
import express from "express";
import multer from "multer";
import uploadBuffer from "../utilities/cloudinaryHelper.js";
import { tokenAuth } from "../middleware/tokenAuth.js";
import Photo from "../models/photoSchema.js";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/photos - upload media
router.post("/", tokenAuth, upload.array("media", 10), async (req, res) => {
  try {
    console.log("Files received:", req.files?.length);
    console.log("Req body:", req.body);
    console.log("User from tokenAuth:", req.guest);

    if (!req.files?.length) {
      return res.status(400).json({ message: "No Media Uploaded" });
    }

    // Upload all files to Cloudinary
    const uploads = await Promise.all(
      req.files.map((file) => uploadBuffer(file.buffer, file.mimetype)),
    );

    console.log("Cloudinary uploads:", uploads);

    // Map uploads to Photo documents
    const mediaDocs = uploads.map((file, i) => ({
      imageUrl: file.url,
      type: file.type,
      caption: Array.isArray(req.body.captions)
        ? req.body.captions[i] || ""
        : req.body.captions || "",
      uploadedBy: req.guest?.id || null,
    }));

    // Save to MongoDB
    const savedMedia = await Photo.insertMany(mediaDocs);

    console.log("Saved to Mongo:", savedMedia);

    return res.status(201).json(savedMedia);
  } catch (err) {
    console.error("Upload route error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/photos - fetch all media
router.get("/", tokenAuth, async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
