import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const HASHED_PASSWORD_LENGTH = 64;

export function encryptPassword(password: string, salt: string): string {
    return scryptSync(password, salt, 32).toString("hex");
}

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");

    return encryptPassword(password, salt) + salt;
}

export function matchPassword(
    password: string,
    hashedPassword: string
): boolean {
    const salt = hashedPassword.slice(HASHED_PASSWORD_LENGTH);
    const originalPasswordHash = hashedPassword.slice(
        0,
        HASHED_PASSWORD_LENGTH
    );
    const currentPasswordHash = encryptPassword(password, salt);

    return timingSafeEqual(
        Buffer.from(originalPasswordHash, "hex"),
        Buffer.from(currentPasswordHash, "hex")
    );
}

export function generateEmailVerificationToken(): string {
    return randomBytes(32).toString("hex");
}
