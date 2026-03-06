import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";

export default (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.upload_stream(
      {
        folder: "wedding",
        resource_type: "auto", // allows images AND videos
      },
      (err, result) => {
        if (err) return reject(err);

        resolve({
          url: result.secure_url,
          type: result.resource_type, // image or video
        });
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
