import { User } from "@university-website/shared";
import { API_URL } from "../consts";

export async function getLoggedInUser(): Promise<User | null> {
    const response = await fetch(`${API_URL}/user`);
    const data = await response.json();

    return data.payload;
}
