const API_URL = import.meta.env.VITE_API_URL;
const DATE_TODAY_OBJECT = new Date();
const YEAR_TODAY = DATE_TODAY_OBJECT.getFullYear();
const DATE_TODAY = DATE_TODAY_OBJECT.toISOString().split("T")[0];
const REFRESH_NAVIGATION_TYPE = "POP";

if (!API_URL) {
    throw new Error("API_URL is not defined");
}

export { API_URL, DATE_TODAY, REFRESH_NAVIGATION_TYPE, YEAR_TODAY };
