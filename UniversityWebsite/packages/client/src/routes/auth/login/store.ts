import { emailValidator, passwordValidator } from "@university-website/shared";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LoginState {
    currentStep: number;
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
    honeypot: string;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setHoneypot: (honeypot: string) => void;
    clearEmailError: () => void;
    clearPasswordError: () => void;
    validateStepOne: () => boolean;
    validateStepTwo: () => boolean;
    nextStep: () => void;

    clearAll: () => void;
}

const SESSION_STORAGE_KEY = "UniversityWebsite__login-cache";

export const useLoginStore = create<LoginState>()(
    persist(
        (set, get) => {
            return {
                currentStep: 1,
                email: "",
                password: "",
                emailError: "",
                passwordError: "",
                honeypot: "",
                setEmail: (email: string) => set({ email }),
                setPassword: (password: string) => set({ password }),
                setHoneypot: (honeypot: string) => set({ honeypot }),
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
                    const passwordValidationResult =
                        passwordValidator(password);

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
                clearAll: () => {
                    set({
                        currentStep: 1,
                        email: "",
                        password: "",
                        emailError: "",
                        passwordError: "",
                        honeypot: "",
                    });
                },
            };
        },
        {
            name: SESSION_STORAGE_KEY,
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(
                        ([key]) => key !== "password" && key !== "passwordError"
                    )
                ),
            merge: (persisted, current) => {
                const typed = persisted as LoginState;

                return {
                    ...current,
                    ...typed,
                };
            },
        }
    )
);
