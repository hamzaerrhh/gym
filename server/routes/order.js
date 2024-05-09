import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/requireAuth.js";
import OrderControl from "../controlers/order.js";
const route = Router();

route.post("/add", requireAuth, OrderControl.add);
route.get("/", requireAuth, requireAdmin, OrderControl.get);
route.delete("/:id", requireAuth, requireAdmin, OrderControl.delete);
route.put("/:id", requireAuth, requireAdmin, OrderControl.edit);

export default route;
