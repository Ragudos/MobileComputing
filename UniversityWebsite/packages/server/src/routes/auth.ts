import {
    deleteLogoutRoute,
    getVerifyEmail,
    postLoginRoute,
    postRegisterRoute,
    postResendVerificationToken,
} from "@/controller/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", postLoginRoute);
authRouter.post("/register", postRegisterRoute);
authRouter.delete("/logout", deleteLogoutRoute);
authRouter.post("/resend-verification", postResendVerificationToken);
authRouter.get("/verify-email", getVerifyEmail);

export default authRouter;
