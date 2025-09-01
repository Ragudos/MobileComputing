import { Logo } from "@/components/header/logo/Logo";
import Wave from "@/components/svg/Wave";
import { ROUTES } from "@/lib/consts";
import { useAuth } from "@/lib/hooks";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import authStyles from "./auth.module.css";

function AuthLayout() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (
                location.pathname !== ROUTES.AUTH.RESEND_VERIFICATION &&
                location.pathname !== ROUTES.AUTH.RESEND_VERIFICATION_SUCCESS
            ) {
                navigate("/");
            }
        }
    }, [user, navigate, location]);

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
