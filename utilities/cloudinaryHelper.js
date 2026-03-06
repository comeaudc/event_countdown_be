import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";

export default (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.upload_stream(
      { folder: "wedding" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};