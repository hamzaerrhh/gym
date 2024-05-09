import { Router } from "express";
import Action from "../controlers/appoinement.js";
import { requireAdmin, requireAuth } from "../middleware/requireAuth.js";

const route = Router();
route.post("/", requireAuth, Action.add);
route.get("/", requireAuth, requireAdmin, Action.getAll);

export default route;
