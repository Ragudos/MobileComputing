import {
    DATE_STRING_PATTERN,
    EMAIL_PATTERN,
    Gender,
    GENDERS,
    INVALID_EMAIL_ERROR_MESSAGES,
    INVALID_PASSWORD_ERROR_MESSAGES,
    MAX_FIRST_NAME,
    MAX_LAST_NAME,
    MAX_YEAR_LEVEL,
    MIN_FIRST_NAME,
    MIN_LAST_NAME,
    MIN_YEAR_LEVEL,
    MONTH_TO_DAYS,
    PASSWORD_PATTERN,
    UNIVERSITY_PROGRAMS,
    UniversityProgram,
    UNREASONABLE_BIRTH_YEAR,
    USER_ROLES,
    UserRole,
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

export function validateStringAsGender(str: string): str is Gender {
    for (const g of GENDERS) {
        if (g === str) {
            return true;
        }
    }

    return false;
}

export function validateStringAsUniversityProgram(
    str: string
): str is UniversityProgram {
    for (const p of UNIVERSITY_PROGRAMS) {
        if (str === p) {
            return true;
        }
    }

    return false;
}

export function validateStringAsUserRole(str: string): str is UserRole {
    for (const ur of USER_ROLES) {
        if (ur === str) {
            return true;
        }
    }

    return false;
}

export function validateFirstName(str: string): boolean {
    return str.length >= MIN_FIRST_NAME && str.length <= MAX_FIRST_NAME;
}

export function validateLastName(str: string): boolean {
    return str.length >= MIN_LAST_NAME && str.length <= MAX_LAST_NAME;
}

export function validateYearLevel(level: number): boolean {
    return level >= MIN_YEAR_LEVEL && level <= MAX_YEAR_LEVEL;
}

export function validateGraduationYear(year: number): boolean {
    return year >= new Date(Date.now()).getFullYear();
}

export type DateOfBirthResult = {
    isValid: boolean;
    /** Normalized date */
    date?: Date;
    message: string;
};

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getTotalDays(
    month: number | string,
    year: number | string
): number {
    const m = Number(month);
    const y = Number(year);

    if (isNaN(m) || isNaN(y)) return 0;

    const daysInMonth = MONTH_TO_DAYS[m.toString().padStart(2, "0")];

    if (!daysInMonth) return 0;

    if (m === 2 && isLeapYear(y)) {
        return 29;
    }

    return daysInMonth;
}

export function validateDateString(input: string): DateOfBirthResult {
    const m = DATE_STRING_PATTERN.exec(input);

    if (!m) {
        return {
            isValid: false,
            message: 'Invalid date format. Use "YYYY-MM-DD".',
        };
    }

    const errors: string[] = [];

    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);

    if (
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > getTotalDays(month, year) ||
        year < UNREASONABLE_BIRTH_YEAR.min ||
        year > UNREASONABLE_BIRTH_YEAR.max
    ) {
        return {
            isValid: false,
            message: "Invalid date of birth.",
        };
    }

    const dateOfBirthUTC = new Date(Date.UTC(year, month - 1, day));
    const isSame =
        dateOfBirthUTC.getUTCFullYear() === year &&
        dateOfBirthUTC.getUTCMonth() === month - 1 &&
        dateOfBirthUTC.getUTCDate() === day;

    if (!isSame) {
        return {
            isValid: false,
            message: "Invalid date of birth.",
        };
    }

    return {
        isValid: true,
        date: dateOfBirthUTC,
        message: "Valid date of birth.",
    };
}
