// Imports
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import { logReq, globalErr, notFound } from "./middleware/basicMiddleware.js";
import cloudinary from "cloudinary";

import inviteRoutes from "./routes/invite.js";
import photoRoutes from "./routes/invite.js";
import rsvpRoutes from "./routes/rsvp.js";
import pushRoutes from "./routes/push.js";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middelwares
app.use(express.json());
app.use(logReq);

// Routes
app.use("/api/invite", inviteRoutes);
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/push", pushRoutes);

// 404 catching middleware
app.use(notFound);

// Global Error Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
