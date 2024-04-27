import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRout from "./routes/user.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Define a test route
app.get("/", (req, res) => {
  console.log("test");
  res.send("hello from home");
});
//define routes
app.use("/api/auth", authRout);

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
