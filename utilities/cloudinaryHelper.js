// utilities/cloudinaryHelper.js
import cloudinary from "cloudinary";

export default async function uploadBufferBase64(buffer, options = {}) {
  try {
    const base64 = `data:application/octet-stream;base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "wedding",
      resource_type: "auto", // supports image & video
      ...options,
    });

    return {
      url: result.secure_url,
      type: result.resource_type, // "image" or "video"
      public_id: result.public_id,
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
}