import { Button } from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { API_URL } from "@/lib/consts";
import { combineClassesOrNone } from "@/lib/utils";
import { FormEvent } from "react";
import { Link } from "react-router";
import loginStyles from "./login.module.css";
import { useLoginStore } from "./store";

function LoginPage() {
    const {
        currentStep,
        email,
        password,
        emailError,
        passwordError,
        setEmail,
        setPassword,
        clearEmailError,
        clearPasswordError,
        validateStepOne,
        validateStepTwo,
        nextStep,
    } = useLoginStore();

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (currentStep === 1) {
            if (validateStepOne()) {
                nextStep();
            }

            return;
        }

        if (!validateStepTwo()) {
            return;
        }
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
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
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
                    </div>
                    <Button variant="primary" type="submit">
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
