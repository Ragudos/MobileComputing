import "@/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App";
import ClickSpark from "./components/react-bits/ClickSpark";
import { AuthContextProvider } from "./context/AuthContext";

const appElement = document.getElementById("app");

if (!appElement) {
    throw new Error("Failed to find the app element");
}

const queryClient = new QueryClient();

createRoot(appElement).render(
    <StrictMode>
        <div className="bg" data-position="top"></div>
        <div className="bg" data-position="bottom"></div>
        <Toaster richColors={true} />
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <ClickSpark
                    sparkCount={10}
                    sparkSize={16}
                    sparkRadius={24}
                    sparkColor="hsl(161 49% 51%)"
                >
                    <App />
                </ClickSpark>
            </AuthContextProvider>
        </QueryClientProvider>
    </StrictMode>
);
