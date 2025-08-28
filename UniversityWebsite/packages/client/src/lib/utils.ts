export function concatenateStrings(...strings: string[]): string {
    return strings.join("");
}

export function combineClassesOrNone(
    ...classes: (string | undefined)[]
): string | undefined {
    const filtered = classes.filter(Boolean);
    return filtered.length > 0 ? filtered.join(" ") : undefined;
}
