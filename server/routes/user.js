import { Router } from "express";
import auth from "../controlers/auth.js";
const route = Router();

route.post("/register", auth.register);
route.post("/login", auth.login);
route.get("/verify/:tokenVerification", auth.verification);
route.get("/logout", auth.logout);
route.post("/forgetPass", auth.forgetPass);
route.post("/reset/:forgetToken", auth.resetPass);
export default route;
