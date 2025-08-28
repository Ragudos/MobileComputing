import { loginRoute, logoutRoute, registerRoute } from "@/controller/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", loginRoute);
authRouter.post("/register", registerRoute);
authRouter.post("/logout", logoutRoute);

export default authRouter;
