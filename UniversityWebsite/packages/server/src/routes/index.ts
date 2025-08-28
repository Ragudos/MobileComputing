import { healthRoute, userRoute } from "@/controller";
import { Router } from "express";
import authRouter from "./auth";

const indexRouter = Router();

indexRouter.get("/health", healthRoute);
indexRouter.get("/user", userRoute);
indexRouter.use("/auth", authRouter);

export default indexRouter;
