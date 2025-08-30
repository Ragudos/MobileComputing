import { Request, Response } from "express";

export async function loginRoute(req: Request, res: Response) {
    res.status(200).json({ message: "User logged in successfully" });
}
export async function registerRoute(req: Request, res: Response) {
    res.status(200).json({ message: "User registered successfully" });
}
export async function logoutRoute(req: Request, res: Response) {
    res.status(200).json({ message: "User logged out successfully" });
}
