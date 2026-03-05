// Imports
import express from "express";
import dotenv from "dotenv";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middelwares
app.use((req, _res, next) => {
  console.log(
    `${req.method} -- ${req.url} -- ${new Date().toLocaleTimeString()}`,
  );

  if (req.body) console.table(req.body);

  next();
});

// Routes

// Global Error Handling
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ errors: [{ msg: err.message }] });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
