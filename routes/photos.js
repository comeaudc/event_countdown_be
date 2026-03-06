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
  upload.array("photos", 10),
  async (req, res, next) => {
    try {
      if (!req.files?.length) {
        return next(error(400, "No Photos Uploaded"));
      }

      const uploads = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer)),
      );

      const photos = uploads.map((url) => ({
        imageUrl: url,
        caption: req.body.caption || "",
        uploadedBy: req.user.id,
      }));

      const savedPhotos = await Photo.insertMany(photos);

      res.status(201).json(savedPhotos);
    } catch (err) {
      console.error(err);
      next(error(500, "Server Error"));
    }
  },
);

export default router;
