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
