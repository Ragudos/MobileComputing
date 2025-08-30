import { CLIENT_URL, SITE_URL } from "@/lib/consts";
import { generateEmailVerificationToken, hashPassword } from "@/lib/crypt";
import db from "@/lib/db";
import { accounts, accountVerification, users } from "@/lib/db/schema";
import { sendGoogleMessage } from "@/lib/gmail";
import { CustomRequest } from "@/types";
import {
    ACCOUNT_VERIFICATION_EXPIRATION_DURATION,
    GenericError,
    INVALID_VERIFICATION_TOKEN_REASONS,
    RegisterPayload,
} from "@university-website/shared";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export async function postLoginRoute(req: Request, res: Response) {
    res.status(200).json({ message: "User logged in successfully" });
}

export async function postRegisterRoute(
    req: CustomRequest<RegisterPayload>,
    res: Response
) {
    const {
        email,
        password,
        honeypot,
        dateOfBirth,
        firstName,
        lastName,
        gender,
        universityProgram,
        yearLevel,
        graduationYear,
    } = req.body;

    if (honeypot) {
        return res.status(400).json({
            message: "Request cannot be processed. Please try again later.",
        });
    }

    if (
        !email ||
        !password ||
        !dateOfBirth ||
        !firstName ||
        !lastName ||
        !gender ||
        !universityProgram ||
        !yearLevel ||
        !graduationYear
    ) {
        return res
            .status(400)
            .json(new GenericError("Missing required fields"));
    }

    try {
        const existingAccountWithEmail =
            (await db.select().from(accounts).where(eq(accounts.email, email)))
                .length > 0;

        if (existingAccountWithEmail) {
            return res
                .status(400)
                .json(new GenericError("Email already in use"));
        }

        const hashedPassword = hashPassword(password);

        await db.transaction(async (tx) => {
            const [user] = await tx
                .insert(users)
                .values({
                    dateOfBirth: new Date(dateOfBirth),
                    firstName,
                    lastName,
                    gender,
                    universityProgram,
                    yearLevel,
                    graduationYear,
                })
                .returning({ id: users.id });

            if (!user) {
                return tx.rollback();
            }

            const [account] = await tx
                .insert(accounts)
                .values({
                    email,
                    password: hashedPassword,
                    userId: user.id,
                })
                .returning({ id: accounts.id });

            if (!account) {
                return tx.rollback();
            }

            const verificationToken = generateEmailVerificationToken();

            await tx.insert(accountVerification).values({
                verificationToken,
                expiresOn: new Date(
                    Date.now() + ACCOUNT_VERIFICATION_EXPIRATION_DURATION
                ),
                accountId: account.id,
            });

            await sendGoogleMessage(
                `<p>Click <a href="${SITE_URL}/auth/verify-email?token=${verificationToken}">here</a> to verify your email address.</p>`,
                email
            );
        });

        res.status(200).json({ message: "Successfully registered" });
    } catch (err) {
        console.error(err);
        return res.status(500).json(new GenericError("Internal server error"));
    }
}

export async function deleteLogoutRoute(req: Request, res: Response) {
    res.status(200).json({ message: "User logged out successfully" });
}

export async function postResendVerificationToken(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json(new GenericError("Missing email"));
    }

    try {
        const [account] = await db
            .select()
            .from(accounts)
            .where(eq(accounts.email, email))
            .limit(1)
            .execute();

        if (!account) {
            return res.status(404).json(new GenericError("Account not found"));
        }

        const [tokenRecord] = await db
            .select()
            .from(accountVerification)
            .where(eq(accountVerification.accountId, account.id))
            .limit(1)
            .execute();

        if (!tokenRecord) {
            return res.status(404).json(new GenericError("Token not found"));
        }

        if (tokenRecord.verified) {
            return res
                .status(400)
                .json(new GenericError("Token already verified"));
        }

        await db.transaction(async (tx) => {
            const verificationToken = generateEmailVerificationToken();

            await tx.update(accountVerification).set({
                verificationToken,
                updatedAt: new Date(),
            });

            await sendGoogleMessage(
                `<p>Click <a href="${SITE_URL}/auth/verify-email?token=${verificationToken}">here</a> to verify your email address.</p>`,
                email
            );
        });

        res.status(200).json({ message: "Verification token resent" });
    } catch (err) {
        console.error(err);
        return res.status(500).json(new GenericError("Internal server error"));
    }
}

export async function getVerifyEmail(req: Request, res: Response) {
    const token = req.query.token;

    if (!token && typeof token !== "string") {
        return res.redirect(
            `${CLIENT_URL}/auth/invalid-token?reason=${encodeURIComponent(INVALID_VERIFICATION_TOKEN_REASONS.MISSING)}`
        );
    }

    const [tokenRecord] = await db
        .select()
        .from(accountVerification)
        .where(
            eq(
                accountVerification.verificationToken,
                decodeURIComponent(token as string)
            )
        )
        .limit(1)
        .execute();

    if (!tokenRecord) {
        return res.redirect(
            `${CLIENT_URL}/auth/invalid-token?reason=${encodeURIComponent(INVALID_VERIFICATION_TOKEN_REASONS.NONEXISTENT)}`
        );
    }

    if (tokenRecord.verified) {
        return res.redirect(
            `${CLIENT_URL}/auth/invalid-token?reason=${encodeURIComponent(INVALID_VERIFICATION_TOKEN_REASONS.ALREADY_VERIFIED)}`
        );
    }

    const expiration = tokenRecord.expiresOn.getTime();

    if (expiration < Date.now()) {
        return res.redirect(
            `${CLIENT_URL}/auth/invalid-token?reason=${encodeURIComponent(INVALID_VERIFICATION_TOKEN_REASONS.EXPIRED)}`
        );
    }

    await db
        .update(accountVerification)
        .set({ verified: true })
        .where(eq(accountVerification.id, tokenRecord.id));

    res.redirect(`${CLIENT_URL}/auth/email-verification-success`);
}
