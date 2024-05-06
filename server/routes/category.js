import { Router } from "express";
import ProductC from "../controlers/category.js";
import { requireAdmin, requireAuth } from "../middleware/requireAuth.js";

const route = Router();

route.post("/addCP", requireAuth, requireAdmin, ProductC.add);
route.get("/", requireAuth, ProductC.get);

export default route;
