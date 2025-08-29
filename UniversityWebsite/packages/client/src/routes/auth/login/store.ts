import {
    emailValidator,
    INVALID_EMAIL_ERROR_MSG,
    PASSWORD_PATTERN_MISMATCH_ERROR_MSG,
    passwordValidator,
} from "@university-website/shared";
import { create } from "zustand";

interface LoginState {
    currentStep: number;
    email: string;
    password: string;
    emailError: string;
    passwordError: string;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    clearEmailError: () => void;
    clearPasswordError: () => void;
    validateStepOne: () => boolean;
    validateStepTwo: () => boolean;
    nextStep: () => void;
}

export const useLoginStore = create<LoginState>((set, get) => {
    return {
        currentStep: 1,
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        setEmail: (email: string) => set({ email }),
        setPassword: (password: string) => set({ password }),
        clearEmailError: () => set({ emailError: "" }),
        clearPasswordError: () => set({ passwordError: "" }),
        validateStepOne: () => {
            const isEmailValid = emailValidator(get().email);

            if (!isEmailValid) {
                set({ emailError: INVALID_EMAIL_ERROR_MSG });
            }

            return isEmailValid;
        },
        validateStepTwo: () => {
            const { email, password } = get();

            const isEmailValid = emailValidator(email);
            const isPasswordValid = passwordValidator(password);

            set({
                emailError: isEmailValid ? "" : INVALID_EMAIL_ERROR_MSG,
                passwordError: isPasswordValid
                    ? ""
                    : PASSWORD_PATTERN_MISMATCH_ERROR_MSG,
            });

            return isEmailValid && isPasswordValid;
        },
        nextStep: () => {
            set({ currentStep: get().currentStep + 1 });
        },
    };
});
