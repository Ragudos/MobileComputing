import { AUTH_COOKIE_NAME, JWT_SECRET } from "@/lib/consts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function healthRoute(req: Request, res: Response) {
    res.status(200).json({ status: "ok" });
}

export async function userRoute(req: Request, res: Response) {
    const cookie = req.cookies[AUTH_COOKIE_NAME];

    if (!cookie) {
        return res.status(200).json({ payload: null });
    }

    try {
        const decoded = jwt.verify(cookie, JWT_SECRET);
        return res.status(200).json({ payload: decoded });
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);

        return res.status(401).json({ payload: null });
    }
}
