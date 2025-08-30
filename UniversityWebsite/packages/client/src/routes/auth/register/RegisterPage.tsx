import { REFRESH_NAVIGATION_TYPE } from "@/lib/consts";
import { useEffect } from "react";
import { Link, useLocation, useNavigationType } from "react-router";
import RegisterForm from "./components/RegisterForm";
import StepIndicator from "./components/StepIndicator";
import registerStyles from "./register.module.css";
import { useRegisterStore } from "./store";

function RegisterPage() {
    const { clearAll } = useRegisterStore();

    const location = useLocation();
    const navigationType = useNavigationType();

    // Remove registration form data on navigation
    // POP is on refresh, so don't clear on refresh
    useEffect(() => {
        if (navigationType !== REFRESH_NAVIGATION_TYPE) {
            clearAll();
        }
    }, [location, navigationType]);

    return (
        <>
            <div className={registerStyles.container}>
                <StepIndicator />
                <div className="card">
                    <div className={registerStyles.registerContainer}>
                        <h1 className="h6">Create an Account</h1>
                        <RegisterForm />
                        <div className={registerStyles.footer}>
                            <small>
                                <Link className="link" to="/terms">
                                    Terms of Service
                                </Link>
                                {" | "}
                                <Link className="link" to="/privacy">
                                    Privacy Policy
                                </Link>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className={registerStyles.signInContainer}>
                    Already have an account?{" "}
                    <Link className="link" to="/auth/login">
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
