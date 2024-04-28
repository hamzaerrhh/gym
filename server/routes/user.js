import { Router } from "express";
import auth from "../controlers/auth.js";
const route = Router();

route.post("/register", auth.register);
route.post("/login", auth.login);
route.get("/verify/:tokenVerification", auth.verification);
route.post("/forgetPass", auth.forgetPass);
route.post("/reset/:forgetToken", auth.resetPass);
route.get("/data", auth.getdata);
export default route;
