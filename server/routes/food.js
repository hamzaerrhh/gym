import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/requireAuth.js";
import Action from "../controlers/food.js";

const route = Router();

route.post("/add", requireAuth, requireAdmin, Action.add);
route.get("/getfood/:id", requireAuth, Action.getById);
route.get("/", requireAuth, Action.getAll);
route.delete("/deletfood/:id", requireAuth, requireAdmin, Action.delete);
route.put("/update/:id", requireAuth, requireAdmin, Action.update);

export default route;
