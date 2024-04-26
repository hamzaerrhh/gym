import User from "../models/user";
import { Router } from "express";
import auth from "../controlers/auth";
const route = Router();

route.post("/register", auth.register);

route.post("/login", auth.login);
route.get("/logout", auth.logout);

export default route;
