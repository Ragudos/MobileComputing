import { emailValidator, passwordValidator } from "@university-website/shared";
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
            const emailValidationResult = emailValidator(get().email);

            set({ emailError: emailValidationResult.errorMessage });

            return emailValidationResult.isValid;
        },
        validateStepTwo: () => {
            const { email, password } = get();

            const emailValidationResult = emailValidator(email);
            const passwordValidationResult = passwordValidator(password);

            set({
                emailError: emailValidationResult.errorMessage,
                passwordError: passwordValidationResult.errorMessage,
            });

            return (
                emailValidationResult.isValid &&
                passwordValidationResult.isValid
            );
        },
        nextStep: () => {
            set({ currentStep: get().currentStep + 1 });
        },
    };
});
