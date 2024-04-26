import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Define a test route
app.get("/", (req, res) => {
  console.log("test");
  res.send("hello from home");
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
