import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import PasswordInput from "@/components/ui/input/PasswordInput";
import { generateRandomPassword } from "@university-website/shared";
import { ChangeEvent } from "react";
import { useRegisterStore } from "../../store";
import credentialsStepStyles from "./credentials_step.module.css";

function CredentialsStep() {
    const {
        email,
        password,
        setEmail,
        setPassword,
        emailError,
        passwordError,
        setEmailError,
        setPasswordError,
    } = useRegisterStore();

    function changeEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        setEmailError("");
    }

    function generatePassword() {
        setPassword(generateRandomPassword());
        setPasswordError("");
    }

    function changePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        setPasswordError("");
    }

    return (
        <>
            <div className="form-input-container">
                <label htmlFor="email">Email*</label>
                <Input
                    value={email}
                    onChange={changeEmail}
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
                <InputError id="email-error" message={emailError} />
            </div>
            <div className="form-input-container">
                <div className={credentialsStepStyles.passwordContainer}>
                    <label htmlFor="password">Password*</label>
                    <Button
                        variant="secondary"
                        onClick={generatePassword}
                        type="button"
                    >
                        <small>Generate password</small>
                    </Button>
                </div>
                <PasswordInput
                    value={password}
                    onChange={changePassword}
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    autoCapitalize="off"
                    autoCorrect="off"
                    placeholder="Enter your password"
                    required
                    aria-errormessage="password-error"
                />
                <InputError id="password-error" message={passwordError} />
            </div>
        </>
    );
}

export default CredentialsStep;
