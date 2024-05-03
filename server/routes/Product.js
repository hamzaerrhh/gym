import express from "express";
import ProductController from "../controlers/Product.js";
import {
  requireAuth,
  requireCoach,
  requireAdmin,
} from "../middleware/requireAuth.js";

const route = express.Router();
route.post("/add", requireAuth, requireAdmin, ProductController.add);
route.get("/", requireAuth, ProductController.getAll);
route.put("/:productId", requireAuth, requireAdmin, ProductController.edit);

export default route;
