import { AUTH_COOKIE_NAME, PRIVATE_KEY } from "@/consts";
import jwt from "jsonwebtoken";

const PROTECTED_ROUTES = ["/dashboard", "/profile"];

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function authMiddleware(req, res, next) {
    const cookie = req.cookies[AUTH_COOKIE_NAME];

    if (!cookie) {
        if (PROTECTED_ROUTES.includes(req.url) && !cookie) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return next();
    }

    try {
        res.locals.user = jwt.verify(cookie, PRIVATE_KEY);
    } catch (error) {
        res.clearCookie(AUTH_COOKIE_NAME);

        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
}
