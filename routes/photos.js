import express from "express";
import multer from "multer";
import uploadToCloudinary from "../utilities/cloudinaryHelper.js";
import { tokenAuth } from "../middleware/tokenAuth.js";
import Photo from "../models/photoSchema.js";
import error from "../utilities/error.js";

const router = express.Router();

// Multer mem storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  tokenAuth,
  upload.array("media", 10),
  async (req, res, next) => {
    try {
      if (!req.files?.length) {
        return next(error(400, "No Media Uploaded"));
      }

      const uploads = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      const media = uploads.map((file, i) => ({
        imageUrl: file.url,
        type: file.type, // image or video
        caption: req.body.captions?.[i] || "",
        uploadedBy: req.user.id,
      }));

      const savedMedia = await Photo.insertMany(media);

      res.status(201).json(savedMedia);
    } catch (err) {
      console.error(err);
      next(error(500, "Server Error"));
    }
  }
);

export default router;
