import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import OrderControl from "../controlers/orderFood.js";
const route = Router();

route.post("/", requireAuth, OrderControl.add);

export default route;
