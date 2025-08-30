import { API_URL } from "@/lib/consts";

export async function resendVerificationEmail(email: string) {
    const response = await fetch(`${API_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw error;
    }

    return response.json();
}
