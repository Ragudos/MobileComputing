import "dotenv/config";
import path from "path";

export const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
export const PORT = process.env.PORT || 3000;
export const CLIENT_DIR = path.join(__dirname, "..", "client", "dist");
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
export const AUTH_COOKIE_NAME = "UniversityWebsite";
export const ONE_DAY = 24 * 60 * 60 * 1000; // 1 day

if (!PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in environment variables");
}

if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL in environment variables");
}
