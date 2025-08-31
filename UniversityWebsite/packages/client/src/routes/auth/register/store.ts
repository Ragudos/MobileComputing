import { YEAR_TODAY } from "@/lib/consts";
import {
    dateToString,
    emailValidator,
    Gender,
    MAX_FIRST_NAME,
    MAX_LAST_NAME,
    MIN_YEAR_LEVEL,
    passwordValidator,
    UniversityProgram,
    validateDateString,
} from "@university-website/shared";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface RegisterState {
    currentStep: number;
    honeypot: string;

    // first step
    firstName: string;
    lastName: string;
    dateOfBirth?: Date | null;
    gender?: Gender | null;
    firstNameError: string;
    lastNameError: string;
    dateOfBirthError: string;
    genderError: string;

    // second step
    universityProgram?: UniversityProgram | null;
    yearLevel: number;
    graduationYear: number;
    programError: string;
    yearLevelError: string;
    graduationYearError: string;

    // third step
    email: string;
    password: string;
    emailError: string;
    passwordError: string;

    setHoneypot: (value: string) => void;

    setFirstName: (name: string) => void;
    setLastName: (name: string) => void;
    setDateOfBirth: (date: Date | null) => void;
    setGender: (gender: Gender | null) => void;

    setFirstNameError: (error: string) => void;
    setLastNameError: (error: string) => void;
    setDateOfBirthError: (error: string) => void;
    setGenderError: (error: string) => void;

    setUniversityProgram: (program: UniversityProgram | null) => void;
    setYearLevel: (level: number) => void;
    setGraduationYear: (year: number) => void;

    setProgramError: (error: string) => void;
    setYearLevelError: (error: string) => void;
    setGraduationYearError: (error: string) => void;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;

    setEmailError: (error: string) => void;
    setPasswordError: (error: string) => void;

    validateFirstStep: () => boolean;
    validateSecondStep: () => boolean;
    validateThirdStep: () => boolean;

    nextStep: () => void;
    previousStep: () => void;

    clearAll: () => void;
}

const SESSION_STORAGE_KEY = "UniversityWebsite__registration-cache";

// We use persist to persist registration
// form data on refresh.
export const useRegisterStore = create<RegisterState>()(
    persist(
        (set, get) => ({
            currentStep: 1,
            honeypot: "",

            // first step
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            gender: null,
            firstNameError: "",
            lastNameError: "",
            dateOfBirthError: "",
            genderError: "",

            universityProgram: null,
            yearLevel: MIN_YEAR_LEVEL,
            graduationYear: YEAR_TODAY,
            programError: "",
            yearLevelError: "",
            graduationYearError: "",

            email: "",
            password: "",
            emailError: "",
            passwordError: "",

            setHoneypot: (value: string) => set({ honeypot: value }),

            setFirstName: (name: string) => set({ firstName: name }),
            setLastName: (name: string) => set({ lastName: name }),
            setDateOfBirth: (date: Date | null) => set({ dateOfBirth: date }),
            setGender: (gender: Gender | null) => set({ gender }),

            setFirstNameError: (error: string) =>
                set({ firstNameError: error }),
            setLastNameError: (error: string) => set({ lastNameError: error }),
            setDateOfBirthError: (error: string) =>
                set({ dateOfBirthError: error }),
            setGenderError: (error: string) => set({ genderError: error }),

            setUniversityProgram: (
                universityProgram: UniversityProgram | null
            ) => set({ universityProgram }),
            setYearLevel: (level: number) => set({ yearLevel: level }),
            setGraduationYear: (year: number) => set({ graduationYear: year }),

            setProgramError: (error: string) => set({ programError: error }),
            setYearLevelError: (error: string) =>
                set({ yearLevelError: error }),
            setGraduationYearError: (error: string) =>
                set({ graduationYearError: error }),

            setEmail: (email: string) => set({ email }),
            setPassword: (password: string) => set({ password }),
            setEmailError: (error: string) => set({ emailError: error }),
            setPasswordError: (error: string) => set({ passwordError: error }),

            validateFirstStep: () => {
                const { firstName, lastName, dateOfBirth, gender } = get();
                const isFirstNameValid =
                    firstName.trim().length > 0 &&
                    firstName.trim().length <= 256;
                const isLastNameValid =
                    lastName.trim().length > 0 && lastName.trim().length <= 256;
                const isDateOfBirthValid =
                    dateOfBirth instanceof Date &&
                    !isNaN(dateOfBirth.getTime()) &&
                    validateDateString(dateToString(dateOfBirth));
                const isGenderValid = gender !== undefined && gender !== null;

                set({
                    firstNameError: isFirstNameValid
                        ? ""
                        : `First name must be between 1 and ${MAX_FIRST_NAME} characters`,
                    lastNameError: isLastNameValid
                        ? ""
                        : `Last name must be between 1 and ${MAX_LAST_NAME} characters`,
                    dateOfBirthError: isDateOfBirthValid
                        ? ""
                        : "Invalid date of birth",
                    genderError: isGenderValid ? "" : "Invalid gender",
                });

                return (
                    isFirstNameValid &&
                    isLastNameValid &&
                    isDateOfBirthValid &&
                    isGenderValid
                );
            },

            validateSecondStep: () => {
                const { universityProgram, yearLevel, graduationYear } = get();

                const isUniversityProgramValid =
                    universityProgram !== null &&
                    universityProgram !== undefined;
                const isYearLevelValid = yearLevel > 0;
                const isGraduationYearValid = graduationYear >= YEAR_TODAY;

                set({
                    programError: isUniversityProgramValid
                        ? ""
                        : "Invalid program",
                    yearLevelError: isYearLevelValid
                        ? ""
                        : "Invalid year level",
                    graduationYearError: isGraduationYearValid
                        ? ""
                        : "Invalid graduation year",
                });

                return (
                    isUniversityProgramValid &&
                    isYearLevelValid &&
                    isGraduationYearValid
                );
            },

            validateThirdStep: () => {
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
                const { currentStep, validateFirstStep, validateSecondStep } =
                    get();

                if (currentStep === 1) {
                    if (!validateFirstStep()) return;
                }

                if (currentStep === 2) {
                    if (!validateSecondStep()) return;
                }

                set({ currentStep: currentStep + 1 });
            },

            previousStep: () => {
                const { currentStep } = get();

                if (currentStep > 1) {
                    set({ currentStep: currentStep - 1 });
                }
            },

            clearAll: () => {
                set({
                    currentStep: 1,
                    firstName: "",
                    lastName: "",
                    dateOfBirth: null,
                    gender: null,
                    universityProgram: null,
                    yearLevel: MIN_YEAR_LEVEL,
                    graduationYear: YEAR_TODAY,
                    email: "",
                    password: "",
                    firstNameError: "",
                    lastNameError: "",
                    dateOfBirthError: "",
                    genderError: "",
                    programError: "",
                    yearLevelError: "",
                    graduationYearError: "",
                    emailError: "",
                    passwordError: "",
                });
                sessionStorage.removeItem(SESSION_STORAGE_KEY);
            },
        }),
        {
            name: SESSION_STORAGE_KEY,
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => {
                        return key !== "password" && key !== "passwordError";
                    })
                ),
            merge: (persisted, current) => {
                const typed = persisted as RegisterState;

                return {
                    ...current,
                    ...typed,
                    dateOfBirth: typed.dateOfBirth
                        ? new Date(typed.dateOfBirth as unknown as string)
                        : null,
                };
            },
        }
    )
);
