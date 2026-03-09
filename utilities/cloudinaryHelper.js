// utilities/cloudinaryHelper.js
import cloudinary from "cloudinary";
import streamifier from "streamifier";

/**
 * Upload a file buffer to Cloudinary.
 * Automatically handles images and videos.
 */
export default async function uploadBuffer(buffer, mimetype, options = {}) {
  try {
    if (mimetype.startsWith("image/")) {
      // Images: use base64
      const base64 = `data:${mimetype};base64,${buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64, {
        folder: "wedding",
        resource_type: "image",
        ...options,
      });
      return {
        url: result.secure_url,
        type: "image",
        public_id: result.public_id,
      };
    } else if (mimetype.startsWith("video/")) {
      // Videos: use upload_stream
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "wedding", resource_type: "video", ...options },
          (err, result) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              return reject(err);
            }
            resolve({
              url: result.secure_url,
              type: "video",
              public_id: result.public_id,
            });
          }
        );
        const readStream = streamifier.createReadStream(buffer);
        readStream.on("error", reject);
        readStream.pipe(uploadStream);
      });
    } else {
      throw new Error("Unsupported file type: " + mimetype);
    }
  } catch (err) {
    console.error("Cloudinary helper error:", err);
    throw err;
  }
}