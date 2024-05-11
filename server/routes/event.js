import Action from "../controlers/event.js";
import { Router } from "express";
const route = Router();

route.post("/", Action.add);
route.get("/", Action.getAll);

export default route;
