import { API_URL } from "@/lib/consts";
import { RegisterState } from "./store";

export async function registerUser(
    payload: Pick<
        RegisterState,
        | "email"
        | "password"
        | "firstName"
        | "lastName"
        | "dateOfBirth"
        | "gender"
        | "program"
        | "yearLevel"
        | "graduationYear"
        | "honeypot"
    >
) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to register");
    }

    return response.json();
}
