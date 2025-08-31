import { Logo } from "@/components/header/logo/Logo";
import Wave from "@/components/svg/Wave";
import { useAuth } from "@/lib/hooks";
import { Navigate, Outlet } from "react-router";
import authStyles from "./auth.module.css";

function AuthLayout() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className={authStyles.authContainer}>
            <div className={authStyles.waveContainer}>
                <Wave />
            </div>
            <div className={authStyles.contentContainer}>
                <Logo />
                <Outlet />
            </div>
        </main>
    );
}

export default AuthLayout;
