const API_URL = import.meta.env.VITE_API_URL;
const DATE_TODAY_OBJECT = new Date();
const YEAR_TODAY = DATE_TODAY_OBJECT.getFullYear();
const DATE_TODAY = DATE_TODAY_OBJECT.toISOString().split("T")[0];
const REFRESH_NAVIGATION_TYPE = "POP";

const API = {
    AUTH: {
        REGISTER: `${API_URL}/auth/register`,
        LOGIN: `${API_URL}/auth/login`,
        LOGOUT: `${API_URL}/auth/logout`,
    },
} as const;

const ROUTES = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REGISTER_SUCCESS: "/auth/register_success",
    },
} as const;

if (!API_URL) {
    throw new Error("API_URL is not defined");
}

export {
    API,
    API_URL,
    DATE_TODAY,
    REFRESH_NAVIGATION_TYPE,
    ROUTES,
    YEAR_TODAY,
};
