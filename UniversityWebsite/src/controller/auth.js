import { AUTH_COOKIE_NAME, IS_DEVELOPMENT, ONE_DAY } from "@/consts";
import db from "@/db";
import { accounts, users } from "@/db/schema";
import { validateEmail, validatePassword } from "@/utils/validator";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export function getLoggedInUser(req, res) {
    if (res.locals.user) {
        return res.status(200).json({ payload: res.locals.user });
    }

    res.status(200).json({ payload: null });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function handleRegister(req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        const firstNameMsg = !firstName ? "First name is required." : "";
        const lastNameMsg = !lastName ? "Last name is required." : "";
        const emailMsg = !email ? "Email is required." : "";
        const passwordMsg = !password ? "Password is required." : "";

        return res.status(422).json({
            firstName: firstNameMsg,
            lastName: lastNameMsg,
            email: emailMsg,
            password: passwordMsg,
        });
    }

    const passwordValidationResult = validatePassword(password);
    const emailValidationResult = validateEmail(email);

    if (passwordValidationResult || emailValidationResult) {
        return res.status(422).json({
            password: passwordValidationResult,
            email: emailValidationResult,
        });
    }

    const account = (
        await db
            .select()
            .from(accounts)
            .where(eq(accounts.email, email))
            .limit(1)
    )[0];

    if (account) {
        return res.status(422).json({
            email: "Email is already in use.",
        });
    }

    try {
        const hashedPassword = password; //await hash(password, 10);

        const user = await db
            .insert(users)
            .values({ firstName, lastName })
            .returning({ id: users.id });
        await db
            .insert(accounts)
            .values({ userId: user[0].id, email, password });

        return res
            .status(201)
            .json({ message: "Account created successfully." });
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

/**
 * Handles user login.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        const emailMsg = !email ? "Email is required." : "";
        const passwordMsg = !password ? "Password is required." : "";

        return res.status(422).json({
            email: emailMsg,
            password: passwordMsg,
        });
    }

    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    if (emailValidationResult || passwordValidationResult) {
        return res.status(422).json({
            email: emailValidationResult,
            password: passwordValidationResult,
        });
    }

    try {
        // Check if the account exists
        const account = (
            await db
                .select()
                .from(accounts)
                .where(eq(accounts.email, email))
                .limit(1)
        )[0];

        if (!account) {
            return res.status(422).json({
                email: "Email or password is incorrect.",
                password: "Email or password is incorrect.",
            });
        }

        // Check if the password is correct
        const isPasswordValid = password === account.password; //await compare(password, account.password);
        if (!isPasswordValid) {
            return res.status(422).json({
                email: "Email or password is incorrect.",
                password: "Email or password is incorrect.",
            });
        }

        const user = (
            await db
                .select()
                .from(users)
                .where(eq(users.id, account.userId))
                .limit(1)
        )[0];

        if (!user) {
            console.error("User not found despite account existence.");

            return res.status(500).json({
                email: "Internal server error.",
                password: "Internal server error.",
            });
        }

        const userJson = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: account.email,
        };

        const token = sign(userJson, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: IS_DEVELOPMENT,
            maxAge: ONE_DAY,
            sameSite: "strict",
        });

        return res
            .status(200)
            .json({ message: "Login successful.", payload: userJson });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

/**
 * Handles user logout.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export function handleLogout(req, res) {
    res.clearCookie(AUTH_COOKIE_NAME);
    return res.status(200).json({ message: "Logout successful." });
}
