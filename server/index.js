import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//the route import
import authRout from "./routes/user.js";
import adminRout from "./routes/admin.js";

dotenv.config();

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
  credentials: true,
};

// Use CORS middleware with specific origins
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));

// Define a test route
app.get("/", (req, res) => {
  console.log("test");
  res.send("hello from home");
});
//define routes
app.use("/api/auth", authRout);
app.use("/api/admin", adminRout);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });
