// uploadBuffer.js
import cloudinary from "cloudinary";
import streamifier from "streamifier";

/**
 * Upload a buffer to Cloudinary
 * @param {Buffer} buffer - file buffer
 * @param {Object} options - optional Cloudinary options
 * @returns {Promise<{url: string, type: string, public_id: string}>}
 */
export default function uploadBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "wedding",
        resource_type: "auto", // supports images and videos
        ...options,
      },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return reject(err);
        }

        resolve({
          url: result.secure_url,
          type: result.resource_type, // "image" or "video"
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}