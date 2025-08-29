import { Logo } from "@/components/header/logo/Logo";
import Wave from "@/components/svg/Wave";
import { Outlet } from "react-router";
import authStyles from "./auth.module.css";

function AuthLayout() {
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
