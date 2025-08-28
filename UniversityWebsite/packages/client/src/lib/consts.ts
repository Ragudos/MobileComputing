const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("API_URL is not defined");
}

export { API_URL };
