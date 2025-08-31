import { getLoggedInUser } from "@/lib/api/user";
import {
    QueryObserverResult,
    RefetchOptions,
    useQuery,
} from "@tanstack/react-query";
import type { User } from "@university-website/shared";
import { createContext, FC, ReactNode } from "react";

type AuthContextType = {
    user: User | null | undefined;
    isLoading: boolean;
    error: Error | null;
    refetch: (
        options?: RefetchOptions
    ) => Promise<QueryObserverResult<User | null, Error>>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    error: null,
    refetch: () =>
        Promise.resolve({} as QueryObserverResult<User | null, Error>),
});

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isLoading, error, refetch } = useQuery<User | null>({
        queryKey: ["user"],
        queryFn: getLoggedInUser,
    });

    return (
        <AuthContext.Provider value={{ user: data, isLoading, error, refetch }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
