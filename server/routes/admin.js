import { Router } from "express";
import Admin from "../controlers/admin.js";
const route = Router();

route.post("/", Admin.add);

export default route;
