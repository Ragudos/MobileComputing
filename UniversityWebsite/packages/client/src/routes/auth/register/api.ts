import { API } from "@/lib/consts";
import { RegisterPayload } from "@university-website/shared";

export async function registerUser(payload: RegisterPayload) {
    const response = await fetch(API.AUTH.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw error;
    }

    return response.json();
}
