import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/requireAuth.js";
import Action from "../controlers/club.js";

const route = Router();

route.post("/", requireAuth, requireAdmin, Action.add);
route.get("/", requireAuth, requireAdmin, Action.getAll);
route.delete("/:id", requireAuth, requireAdmin, Action.delet);

export default route;
