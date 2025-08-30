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
    const special = "!@#$%^&*_-+()";

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

export function msToTextDuration(duration: number): string {
    if (duration % 3600000 === 0) {
        const hours = Math.floor(duration / 3600000);
        return `${hours} hour/s`;
    }

    if (duration % 60000 === 0) {
        const minutes = Math.floor(duration / 60000);
        return `${minutes} minute/s`;
    }

    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    return `${hours} hour/s ${minutes} minute/s ${seconds} second/s`;
}
