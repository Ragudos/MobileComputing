import { API } from "@/lib/consts";
import { LoginPayload } from "@university-website/shared";

export async function loginUser({ email, password, honeypot }: LoginPayload) {
    const response = await fetch(API.AUTH.LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, honeypot }),
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw error;
    }

    return response.json();
}
