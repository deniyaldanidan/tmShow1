import { Router } from "express";
import registerHandler from "../Controllers/auth/registerUser";
import loginHandler from "../Controllers/auth/loginUser";
import logoutController from "../Controllers/auth/logout";
import refreshController from "../Controllers/auth/refresh";


const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutController);
authRoutes.get("/refresh", refreshController);


export default authRoutes;