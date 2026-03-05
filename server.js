// Imports
import express from "express";
import dotenv from "dotenv";
import error from "./utilities/error.js";
import { logReq, globalErr, notFound } from "./middleware/basicMiddleware.js";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middelwares
app.use(logReq);

// Routes

// 404 catching middleware
app.use(notFound);

// Global Error Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
