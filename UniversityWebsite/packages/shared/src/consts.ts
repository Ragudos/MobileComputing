export type UserRole = (typeof USER_ROLES)[number];
export type Gender = (typeof GENDERS)[number];
export type UniversityProgram = (typeof UNIVERSITY_PROGRAMS)[number];
export type User = {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: Gender;
    biography: string;
    universityProgram: UniversityProgram;
    yearLevel: number;
    graduationYear: number;
    role: UserRole;
};
export type RegisterPayload = User & {
    password: string;
    honeypot: string;
};

export const GENDERS = ["male", "female", "non-binary", "other"] as const;
export const USER_ROLES = ["student", "professor", "admin"] as const;
export const MAX_YEAR_LEVEL = 6;
export const MIN_YEAR_LEVEL = 1;
export const MAX_FIRST_NAME = 256;
export const MAX_LAST_NAME = 256;
export const UNIVERSITY_PROGRAMS = [
    "(BSCS) Bachelor of Science in Computer Science",
    "(BSIT) Bachelor of Science in Information Technology",
    "(BSIS) Bachelor of Science in Information Systems",
    "(BSBA) Bachelor of Science in Business Administration",
    "(BSA) Bachelor of Science in Accountancy",
    "(BSP) Bachelor of Science in Psychology",
    "(ABCOMM) Bachelor of Arts in Communication",
    "(BEED) Bachelor of Elementary Education",
    "(BSED) Bachelor of Secondary Education",
    "(BSCE) Bachelor of Science in Civil Engineering",
    "(BSEE) Bachelor of Science in Electrical Engineering",
    "(BSME) Bachelor of Science in Mechanical Engineering",
    "(BSARCH) Bachelor of Science in Architecture", // ✅ architecture included
    "(BSN) Bachelor of Science in Nursing",
    "(BSHM) Bachelor of Science in Hospitality Management",
    "(BSTM) Bachelor of Science in Tourism Management",
] as const;

export const INVALID_PASSWORD_ERROR_MESSAGES = {
    required: "Password is required",
    format: "Must be 8-64 characters, include 1 uppercase and lowercase letter, 1 number, and 1 special character.",
};
export const INVALID_EMAIL_ERROR_MESSAGES = {
    required: "Email is required",
    taken: "Email is already taken",
    format: "Email is invalid",
};

/**
 * @see https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 *
 * What this does:
 * - At least 8 characters
 * - At most 64 characters
 * - One uppercase letter
 * - One lowercase letter
 * - One number
 * - One special character
 */
export const PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/;

/**
 * @see https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
 */
export const EMAIL_PATTERN =
    /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const REQUIRED_REGISTER_FIELDS = {
    email: "email",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    dateOfBirth: "dateOfBirth",
    gender: "gender",
    universityProgram: "universityProgram",
    yearLevel: "yearLevel",
    graduationYear: "graduationYear",
} as const;
