import { Logo } from "@/components/header/logo/Logo";
import Wave from "@/components/svg/Wave";
import { ROUTES } from "@/lib/consts";
import { useAuth } from "@/lib/hooks";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import authStyles from "./auth.module.css";

function AuthLayout() {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !isLoading) {
            if (
                location.pathname !== ROUTES.AUTH.RESEND_VERIFICATION &&
                location.pathname !== ROUTES.AUTH.RESEND_VERIFICATION_SUCCESS
            ) {
                navigate("/");
            }
        }
    }, [user, navigate, location, isLoading]);

    if (isLoading) {
        return null;
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
