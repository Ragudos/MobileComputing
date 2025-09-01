import { Button } from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { API_URL, REFRESH_NAVIGATION_TYPE } from "@/lib/consts";
import { useAuth } from "@/lib/hooks";
import { combineClassesOrNone, extractErrorMessage } from "@/lib/utils";
import { FormEvent, useEffect, useTransition } from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useNavigationType,
} from "react-router";
import { toast } from "sonner";
import { loginUser } from "./api";
import loginStyles from "./login.module.css";
import { useLoginStore } from "./store";

function LoginPage() {
    const {
        currentStep,
        email,
        password,
        emailError,
        passwordError,
        honeypot,
        setEmail,
        setPassword,
        setHoneypot,
        clearEmailError,
        clearPasswordError,
        validateStepOne,
        validateStepTwo,
        nextStep,
        clearAll,
    } = useLoginStore();
    const { refetch } = useAuth();

    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    const location = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (navigationType !== REFRESH_NAVIGATION_TYPE) {
            clearAll();
        }
    }, [location, navigationType]);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isPending) {
            return;
        }

        if (currentStep === 1) {
            if (validateStepOne()) {
                nextStep();
            }

            return;
        }

        if (!validateStepTwo()) {
            return;
        }

        const id = toast.loading("Logging in...");

        startTransition(async () => {
            try {
                await loginUser({ email, password, honeypot });

                startTransition(async () => {
                    const { error } = await refetch();

                    if (error) {
                        console.error(error);

                        toast.error(
                            extractErrorMessage("Something went wrong"),
                            { id }
                        );
                        return;
                    }

                    startTransition(() => {
                        toast.success("Logged in successfully!", { id });
                        navigate("/", { replace: true });
                    });
                });
            } catch (err) {
                console.error(err);

                toast.error(extractErrorMessage(err), { id });
            }
        });
    }

    return (
        <>
            <div
                className={combineClassesOrNone(
                    "card",
                    loginStyles.loginContainer
                )}
            >
                <h1 className="h6">Welcome Back!</h1>
                <form
                    method="POST"
                    encType="multipart/form-data"
                    action={`${API_URL}/auth/login`}
                    onSubmit={onSubmit}
                    className="form"
                    noValidate
                >
                    <div className="input-wrapper">
                        <div className="form-input-container">
                            <label htmlFor="email">Email</label>
                            <Input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearEmailError();
                                }}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                autoCapitalize="off"
                                autoCorrect="off"
                                required
                                aria-errormessage="email-error"
                            />
                            <small id="email-error" style={{ color: "red" }}>
                                {emailError}
                            </small>
                        </div>
                        {currentStep === 2 && (
                            <div className="form-input-container">
                                <label htmlFor="password">Password</label>
                                <PasswordInput
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        clearPasswordError();
                                    }}
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    autoFocus
                                    placeholder="Enter your password"
                                    required
                                    aria-errormessage="password-error"
                                />
                                <small
                                    id="password-error"
                                    style={{ color: "red" }}
                                >
                                    {passwordError}
                                </small>
                            </div>
                        )}
                        <input
                            className="visually-hidden"
                            type="text"
                            name="honeypot"
                            id="honeypot"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            aria-hidden="true"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                        />
                    </div>
                    <Button
                        disabled={isPending}
                        variant="primary"
                        type="submit"
                    >
                        {currentStep === 1 ? "Next" : "Login"}
                    </Button>
                </form>
            </div>
            <div className="card">
                <div className={loginStyles.signUpContainer}>
                    Don&apos;t have an account yet?{" "}
                    <Link className="link" to="/auth/register">
                        Sign up
                    </Link>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
