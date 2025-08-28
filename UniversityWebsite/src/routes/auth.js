import {
    getLoggedInUser,
    handleLogin,
    handleLogout,
    handleRegister,
} from "@/controller/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);
authRouter.get("/me", getLoggedInUser);

export default authRouter;
