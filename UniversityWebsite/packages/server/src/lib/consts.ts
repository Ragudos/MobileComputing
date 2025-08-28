import "dotenv/config";

const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const JWT_SECRET = process.env.JWT_SECRET as string;
const DATABASE_URL = process.env.DATABASE_URL as string;
const API_URL = process.env.API_URL as string;
const CLIENT_URL = process.env.CLIENT_URL as string;

const AUTH_COOKIE_NAME = "UniveristyWebsite__cookie";

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET");
}

if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
}

if (!API_URL) {
    throw new Error("Missing API_URL");
}

if (!CLIENT_URL) {
    throw new Error("Missing CLIENT_URL");
}

export {
    API_URL,
    AUTH_COOKIE_NAME,
    CLIENT_URL,
    DATABASE_URL,
    IS_DEVELOPMENT,
    JWT_SECRET,
    PORT,
};
