import { Ref, RefObject } from "react";

export function concatenateStrings(...strings: string[]): string {
    return strings.join("");
}

export function combineClassesOrNone(
    ...classes: (string | undefined)[]
): string | undefined {
    const filtered = classes.filter(Boolean);
    return filtered.length > 0 ? filtered.join(" ") : undefined;
}

export function setRefs<T>(...refs: (Ref<T> | undefined)[]) {
    return (instance: T) => {
        for (const ref of refs) {
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref != null) {
                (ref as RefObject<T | null>).current = instance;
            }
        }
    };
}

export function extractErrorMessage(err: unknown): string {
    if (err instanceof Error) {
        return err.message;
    } else if (typeof err === "string") {
        return err;
    } else {
        return "An unexpected error occurred. Please try again.";
    }
}

export function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(str: string): string {
    return str
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

export function generateRandomPassword(): string {
    const length = randomInRange(10, 16);
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*_+";

    let password =
        lower.charAt(Math.floor(Math.random() * lower.length)) +
        upper.charAt(Math.floor(Math.random() * upper.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length)) +
        special.charAt(Math.floor(Math.random() * special.length));

    const all = lower + upper + numbers + special;
    for (let i = password.length; i < length; i++) {
        password += all.charAt(Math.floor(Math.random() * all.length));
    }

    return shuffle(password);
}
