import { createContext, useCallback, useEffect, useRef, useState } from "react";

/**
 * @typedef {Object} User
 * @property {string} userId - The unique identifier for the user.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} email - The user's email address.
 * @property {string} role - The user's role (e.g., "user", "admin").
 */

/**
 * @typedef {(email: string | undefined, password: string | undefined) => void} Login
 */

/**
 * @typedef {(email: string | undefined, password: string | undefined, firstName: string | undefined, lastName: string | undefined)} Register
 */

/**
 * @typedef {() => void} Logout
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User | null} user
 * @property {Login} login
 * @property {Register} register
 * @property {Logout} logout
 * @property {boolean} loading
 */

/**
 * @type {import("react").Context<AuthContextType | null>}
 */
const AuthContext = createContext(null);

/**
 * @type {import("react").FC<{ children: React.ReactNode }>}
 */
function AuthContextProvider({ children }) {
    /**
     * @type {[User | null, (user: User | null) => void]}
     */
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const requestIdRef = useRef(0);

    const runWithLock = async (fn) => {
        const currentId = ++requestIdRef.current;

        try {
            const res = await fn();

            if (currentId === requestIdRef.current) {
                return res;
            }
        } catch (err) {
            if (currentId === requestIdRef.current) {
                throw err;
            }
        }
    };
    const fetchUser = useCallback(async () => {
        setLoading(true);

        try {
            const res = await runWithLock(async () => {
                const res = await fetch("/auth/me");

                return res.ok ? (await res.json()).payload : null;
            });

            setUser(res);
        } catch (err) {
            setUser(null);

            if (!(err instanceof Error)) {
                return;
            }

            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    /**
     * @type {Login}
     */
    const login = async (email, password) => {
        await runWithLock(async () => {
            setLoading(true);

            const res = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                setLoading(false);
                throw res.json();
            }

            const data = await res.json();
            setUser(data.payload);
        });
    };

    /**
     * @type {Register}
     */
    const register = async (email, password, firstName, lastName) => {
        await runWithLock(async () => {
            setLoading(true);

            const res = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });

            if (!res.ok) {
                setLoading(false);
                throw res.json();
            }

            const data = await res.json();
            setUser(data.payload);
        });
    };

    /**
     * @type {Logout}
     */
    const logout = async () => {
        await runWithLock(async () => {
            setLoading(true);

            const res = await fetch("/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            setLoading(false);

            if (!res.ok) {
                throw res.json();
            }

            setUser(null);
        });
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
export default AuthContextProvider;
