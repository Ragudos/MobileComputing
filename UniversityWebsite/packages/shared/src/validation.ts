import {
    EMAIL_PATTERN,
    INVALID_EMAIL_ERROR_MESSAGES,
    INVALID_PASSWORD_ERROR_MESSAGES,
    PASSWORD_PATTERN,
} from "./consts";

type ValidatorResult = {
    isValid: boolean;
    errorMessage?: string;
};

export function passwordValidator(pwd: string): ValidatorResult {
    if (!pwd) {
        return {
            isValid: false,
            errorMessage: INVALID_PASSWORD_ERROR_MESSAGES.required,
        };
    }

    const isValid = PASSWORD_PATTERN.test(pwd);

    return {
        isValid,
        errorMessage: isValid
            ? undefined
            : INVALID_PASSWORD_ERROR_MESSAGES.format,
    };
}

export function emailValidator(email: string): ValidatorResult {
    if (!email) {
        return {
            isValid: false,
            errorMessage: INVALID_EMAIL_ERROR_MESSAGES.required,
        };
    }

    const isValid = EMAIL_PATTERN.test(email);

    return {
        isValid,
        errorMessage: isValid ? undefined : INVALID_EMAIL_ERROR_MESSAGES.format,
    };
}
