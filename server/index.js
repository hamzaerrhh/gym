import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//the route import
import authRout from "./routes/user.js";
import adminRout from "./routes/admin.js";
import productRoutes from "./routes/Product.js";
import foodRoute from "./routes/food.js";
import catRoute from "./routes/category.js";
import orderRoute from "./routes/order.js";
import appoinementsRoute from "./routes/appoinement.js";
import clubRout from "./routes/clubs.js";

dotenv.config();

const app = express();

app.use(express.static("public"));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
  credentials: true,
};

// Use CORS middleware with specific origins
app.use(cors(corsOptions));

// Handle OPTIONS requests globally
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Define a test route
app.get("/", (req, res) => {
  console.log("test");
  res.send("hello from home");
});
//define routes
app.use("/api/auth", authRout);
app.use("/api/admin", adminRout);
app.use("/api/product", productRoutes);
app.use("/api/food", foodRoute);
app.use("/api/product/cat", catRoute);
app.use("/api/order", orderRoute);
app.use("/api/appoinement", appoinementsRoute);
app.use("/api/club", clubRout);

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
