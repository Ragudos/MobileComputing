import "dotenv/config";

const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const JWT_SECRET = process.env.JWT_SECRET as string;
const DATABASE_URL = process.env.DATABASE_URL as string;
const API_URL = process.env.API_URL as string;
const SITE_URL = IS_DEVELOPMENT ? API_URL + ":" + PORT : API_URL;
const CLIENT_URL = process.env.CLIENT_URL as string;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN as string;
const GOOGLE_GMAIL_USER = process.env.GOOGLE_GMAIL_USER as string;

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

if (!GOOGLE_CLIENT_ID) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
}

if (!GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
}

if (!GOOGLE_REFRESH_TOKEN) {
    throw new Error("Missing GOOGLE_REFRESH_TOKEN");
}

if (!GOOGLE_GMAIL_USER) {
    throw new Error("Missing GOOGLE_GMAIL_USER");
}

export {
    API_URL,
    AUTH_COOKIE_NAME,
    CLIENT_URL,
    DATABASE_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_GMAIL_USER,
    GOOGLE_REFRESH_TOKEN,
    IS_DEVELOPMENT,
    JWT_SECRET,
    PORT,
    SITE_URL,
};

