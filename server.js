// Imports
import express from "express";
import dotenv from "dotenv";
import { logReq, globalErr } from "./middleware/basicMiddleware.js";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middelwares
app.use(logReq);

// Routes

// Global Error Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
