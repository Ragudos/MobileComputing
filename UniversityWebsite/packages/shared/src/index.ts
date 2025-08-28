export type UserRole = "student" | "professor" | "admin";

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
};
