import { Router } from "express";
import Admin from "../controlers/admin.js";
import { requireAdmin, requireAuth } from "../middleware/requireAuth.js";
const route = Router();

route.post("/", Admin.add);
route.get("/:role", requireAuth, requireAdmin, Admin.get);
route.put("/:id", requireAuth, requireAdmin, Admin.editRole);
route.post("/dodo", Admin.addGG);
export default route;
