import { Router } from "express";
import registerHandler from "../Controllers/auth/registerUser";
import loginHandler from "../Controllers/auth/loginUser";


const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler)


export default authRoutes;