import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
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
      if (!req.files || req.files.length === 0)
        next(error(400, "No Photos Uploaded"));

      const uploads = await Promise.all(
        req.files.map((file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.upload_stream(
              { folder: "wedding" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
              },
            );

            streamifier.createReadStream(file.buffer).pipe(stream);
          });
        }),
      );

      const savedPhotos = await Photo.insertMany(
        uploads.map((url) => ({
          imageUrl: url,
          caption: req.body.caption || "",
          uploadedBy: req.user.id,
        })),
      );

      res.status(201).json(savedPhotos);
    } catch (err) {
      console.error(err);
      next(error(500, "Server Error"));
    }
  },
);

export default router;
