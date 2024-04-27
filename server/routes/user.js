import { Router } from "express";
import auth from "../controlers/auth.js";
const route = Router();

route.post("/register", auth.register);
route.post("/login", auth.login);
route.get("/verify/:tokenVerification", auth.verification);
route.get("/logout", auth.logout);
route.get("/forgetPass", auth.forgetPass);
route.post("/reset", auth.resetPass);
export default route;
