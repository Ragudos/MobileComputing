import {
    emailValidator,
    Gender,
    INVALID_EMAIL_ERROR_MSG,
    PASSWORD_PATTERN_MISMATCH_ERROR_MSG,
    passwordValidator,
} from "@university-website/shared";
import { create } from "zustand";

export interface RegisterState {
    currentStep: number;

    // first step
    firstName: string;
    lastName: string;
    dateOfBirth?: Date | null;
    gender?: Gender | null;
    biography: string;
    firstNameError: string;
    lastNameError: string;
    dateOfBirthError: string;
    genderError: string;
    biographyError: string;

    // second step
    program: string;
    yearLevel: number;
    graduationYear: number;
    programError: string;
    yearLevelError: string;
    graduationYearError: string;

    // third step
    email: string;
    emailError: string;
    password: string;
    passwordError: string;

    setFirstName: (name: string) => void;
    setLastName: (name: string) => void;
    setDateOfBirth: (date: Date | null) => void;
    setGender: (gender: Gender | null) => void;
    setBiography: (bio: string) => void;

    setFirstNameError: (error: string) => void;
    setLastNameError: (error: string) => void;
    setDateOfBirthError: (error: string) => void;
    setGenderError: (error: string) => void;
    setBiographyError: (error: string) => void;

    setProgram: (program: string) => void;
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
}

export const useRegisterStore = create<RegisterState>((set, get) => {
    return {
        currentStep: 1,

        // first step
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        gender: null,
        biography: "",
        firstNameError: "",
        lastNameError: "",
        dateOfBirthError: "",
        genderError: "",
        biographyError: "",

        program: "",
        yearLevel: 1,
        graduationYear: 2023,
        programError: "",
        yearLevelError: "",
        graduationYearError: "",

        email: "",
        password: "",
        emailError: "",
        passwordError: "",

        setFirstName: (name: string) => set({ firstName: name }),
        setLastName: (name: string) => set({ lastName: name }),
        setDateOfBirth: (date: Date | null) => set({ dateOfBirth: date }),
        setGender: (gender: Gender | null) => set({ gender }),
        setBiography: (bio: string) => set({ biography: bio }),

        setFirstNameError: (error: string) => set({ firstNameError: error }),
        setLastNameError: (error: string) => set({ lastNameError: error }),
        setDateOfBirthError: (error: string) =>
            set({ dateOfBirthError: error }),
        setGenderError: (error: string) => set({ genderError: error }),
        setBiographyError: (error: string) => set({ biographyError: error }),

        setProgram: (program: string) => set({ program }),
        setYearLevel: (level: number) => set({ yearLevel: level }),
        setGraduationYear: (year: number) => set({ graduationYear: year }),

        setProgramError: (error: string) => set({ programError: error }),
        setYearLevelError: (error: string) => set({ yearLevelError: error }),
        setGraduationYearError: (error: string) =>
            set({ graduationYearError: error }),

        setEmail: (email: string) => set({ email }),
        setPassword: (password: string) => set({ password }),

        setEmailError: (error: string) => set({ emailError: error }),
        setPasswordError: (error: string) => set({ passwordError: error }),

        validateFirstStep: () => {
            const { firstName, lastName, dateOfBirth, gender, biography } =
                get();
            const isFirstNameValid = firstName.trim().length > 0;
            const isLastNameValid = lastName.trim().length > 0;
            const isDateOfBirthValid =
                dateOfBirth instanceof Date && !isNaN(dateOfBirth.getTime());
            const isGenderValid = gender !== undefined;
            const isBiographyValid = biography.trim().length > 0;

            set({
                firstNameError: isFirstNameValid ? "" : "Invalid first name",
                lastNameError: isLastNameValid ? "" : "Invalid last name",
                dateOfBirthError: isDateOfBirthValid
                    ? ""
                    : "Invalid date of birth",
                genderError: isGenderValid ? "" : "Invalid gender",
                biographyError: isBiographyValid ? "" : "Invalid biography",
            });

            return (
                isFirstNameValid &&
                isLastNameValid &&
                isDateOfBirthValid &&
                isGenderValid &&
                isBiographyValid
            );
        },

        validateSecondStep: () => {
            const { program, yearLevel, graduationYear } = get();

            const isProgramValid = program.trim().length > 0;
            const isYearLevelValid = yearLevel > 0;
            const isGraduationYearValid =
                graduationYear > new Date().getFullYear();

            set({
                programError: isProgramValid ? "" : "Invalid program",
                yearLevelError: isYearLevelValid ? "" : "Invalid year level",
                graduationYearError: isGraduationYearValid
                    ? ""
                    : "Invalid graduation year",
            });

            return isProgramValid && isYearLevelValid && isGraduationYearValid;
        },

        validateThirdStep: () => {
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
    };
});
