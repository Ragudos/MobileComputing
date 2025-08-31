import { expect, test } from "@jest/globals";
import {
    generateRandomPassword,
    passwordValidator,
    validateDateString,
} from ".";

test("Validates passwords properly", () => {
    const PASSWORDS = Array.from({ length: 100 }, () =>
        generateRandomPassword()
    );

    let errors: string[] = [];

    for (const password of PASSWORDS) {
        if (!passwordValidator(password).isValid) {
            errors.push(password);
        }
    }

    if (errors.length > 0) {
        console.error("Invalid passwords found:", errors);
    }

    expect(errors).toHaveLength(0);

    expect(passwordValidator("123").isValid).toBe(false);
    expect(passwordValidator("password").isValid).toBe(false);
    expect(passwordValidator("Password1!").isValid).toBe(true);
    expect(passwordValidator("P@ssw0rd").isValid).toBe(true);
    expect(passwordValidator("$#@*($@#*").isValid).toBe(false);
});

test("Validates YYYY-MM-DD properly", () => {
    const dates = ["2020-01-01", "1999-12-31", "2024-02-29", "2020-04-30"];

    const invalidDates = [
        "2020-02-30",
        "2021-02-29",
        "2020-04-31",
        "2020-06-31",
        "9999-12-31",
    ];

    for (const date of dates) {
        const result = validateDateString(date);

        expect(result.isValid).toBe(true);
    }

    for (const date of invalidDates) {
        const result = validateDateString(date);

        expect(result.isValid).toBe(false);
    }
});
