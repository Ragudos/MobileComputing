export type UserRole = "student" | "professor" | "admin";
export type Gender = "male" | "female" | "non-binary" | "other";

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: Gender;
    biography: string;
    program: string;
    yearLevel: number;
    graduationYear: number;
    role: UserRole;
};

export const PASSWORD_PATTERN_MISMATCH_ERROR_MSG =
    "Must be at least 8 characters, include 1 uppercase and lowercase letter, 1 number, and 1 special character.";
export const INVALID_EMAIL_ERROR_MSG = "Invalid email address";

/**
 * @see https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 *
 * What this does:
 * - At least 8 characters
 * - One uppercase letter
 * - One lowercase letter
 * - One number
 * - One special character
 */
export const PASSWORD_PATTERN =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

/**
 * @see https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
 */
export const EMAIL_PATTERN =
    /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function passwordValidator(pwd: string) {
    return PASSWORD_PATTERN.test(pwd);
}

export function emailValidator(email: string) {
    return EMAIL_PATTERN.test(email);
}
