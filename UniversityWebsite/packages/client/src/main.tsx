import "@/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const appElement = document.getElementById("app");

if (!appElement) {
    throw new Error("Failed to find the app element");
}

const queryClient = new QueryClient();

createRoot(appElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </QueryClientProvider>
    </StrictMode>
);

console.log(import.meta.env.VITE_API_URL);
