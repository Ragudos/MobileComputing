import { expect, test } from "@jest/globals";
import { generateRandomPassword, passwordValidator } from ".";

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
