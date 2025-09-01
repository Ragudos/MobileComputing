import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}
