import {
    AUTH_COOKIE_NAME,
    CLIENT_URL,
    IS_DEVELOPMENT,
    JWT_SECRET,
    SITE_URL,
} from "@/lib/consts";
import {
    generateEmailVerificationToken,
    hashPassword,
    matchPassword,
} from "@/lib/crypt";
import db from "@/lib/db";
import { accounts, accountVerification, users } from "@/lib/db/schema";
import { sendGoogleMessage } from "@/lib/gmail";
import { CustomRequest } from "@/types";
import {
    ACCOUNT_VERIFICATION_EXPIRATION_DURATION,
    dateToString,
    emailValidator,
    GenericError,
    INVALID_VERIFICATION_TOKEN_REASONS,
    LoginPayload,
    passwordValidator,
    RegisterPayload,
    User,
    validateDateString,
    validateFirstName,
    validateGraduationYear,
    validateLastName,
    validateStringAsGender,
    validateStringAsUniversityProgram,
    validateYearLevel,
} from "@university-website/shared";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export async function postLoginRoute(
    req: CustomRequest<LoginPayload>,
    res: Response
) {
    const { email, password, honeypot } = req.body;

    if (honeypot) {
        return res.status(400).json({
            message: "Request cannot be processed. Please try again later.",
        });
    }

    if (!email || !password) {
        return res
            .status(400)
            .json(new GenericError("Missing email or password"));
    }

    const emailValidationResult = emailValidator(email);

    if (!emailValidationResult.isValid) {
        return res.status(400).json({
            message: emailValidationResult.errorMessage,
        });
    }

    const passwordValidationResult = passwordValidator(password);

    if (!passwordValidationResult.isValid) {
        return res.status(400).json({
            message: passwordValidationResult.errorMessage,
        });
    }

    try {
        const [account] = await db
            .select()
            .from(accounts)
            .where(eq(accounts.email, email))
            .limit(1)
            .execute();

        if (!account) {
            return res
                .status(401)
                .json(new GenericError("Invalid email or password"));
        }

        const isPasswordValid = matchPassword(password, account.password);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json(new GenericError("Invalid email or password"));
        }

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, account.userId))
            .limit(1)
            .execute();

        if (!user) {
            if (IS_DEVELOPMENT) {
                console.error("User not found despite having a valid account");
            }

            return res
                .status(500)
                .json(new GenericError("Something went wrong"));
        }

        const [verificationStatus] = await db
            .select()
            .from(accountVerification)
            .where(eq(accountVerification.accountId, account.id))
            .limit(1)
            .execute();

        if (!verificationStatus) {
            if (IS_DEVELOPMENT) {
                console.error(
                    "No verification token despite having a valid account and user"
                );
            }

            return res
                .status(500)
                .json(new GenericError("Internal Server Error"));
        }

        const userJson: User = {
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            email: account.email,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            universityProgram: user.universityProgram,
            yearLevel: user.yearLevel,
            graduationYear: user.graduationYear,
            isVerified: verificationStatus?.verified,
        };

        const token = jsonwebtoken.sign(userJson, JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            sameSite: "none",
        });

        res.status(200).json({
            message: "Login successful",
        });
    } catch (err) {
        if (IS_DEVELOPMENT) {
            console.error(err);
        }

        res.status(500).json(new GenericError("Internal Server Error"));
    }
}

function validatePostRegisterRouteBody({
    email,
    password,
    dateOfBirth,
    firstName,
    lastName,
    gender,
    universityProgram,
    yearLevel,
    graduationYear,
}: Omit<RegisterPayload, "honeypot">): boolean {
    try {
        const emailValidationResult = emailValidator(email);
        const passwordValidationResult = passwordValidator(password);
        const verifiedDate = new Date(dateOfBirth);
        const dateOfBirthValidationResult = validateDateString(
            dateToString(verifiedDate)
        );
        const isFirstNameValid = validateFirstName(firstName);
        const isLastNameValid = validateLastName(lastName);
        const isGenderValid = validateStringAsGender(gender);
        const isUniversityProgramValid =
            validateStringAsUniversityProgram(universityProgram);
        const isYearLevelValid = validateYearLevel(yearLevel);
        const isGraduationYearValid = validateGraduationYear(graduationYear);

        return (
            emailValidationResult.isValid &&
            passwordValidationResult.isValid &&
            dateOfBirthValidationResult.isValid &&
            isFirstNameValid &&
            isLastNameValid &&
            isGenderValid &&
            isUniversityProgramValid &&
            isYearLevelValid &&
            isGraduationYearValid
        );
    } catch (err) {
        if (IS_DEVELOPMENT) {
            console.error(err);
        }

        return false;
    }
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

    if (
        !validatePostRegisterRouteBody({
            email,
            password,
            dateOfBirth,
            firstName,
            lastName,
            gender,
            universityProgram,
            yearLevel,
            graduationYear,
        })
    ) {
        return res.status(400).json(new GenericError("Invalid request data"));
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

export async function deleteLogoutRoute(_: Request, res: Response) {
    res.cookie(AUTH_COOKIE_NAME, "", {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200);
    res.end();
}

export async function postResendVerificationToken(req: Request, res: Response) {
    const { email, honeypot } = req.body;

    if (honeypot) {
        return res.status(400).json({
            message: "Request cannot be processed. Please try again later.",
        });
    }

    if (!email) {
        return res.status(400).json(new GenericError("Missing email"));
    }

    const emailValidationResult = emailValidator(email);

    if (!emailValidationResult.isValid) {
        return res.status(400).json({
            message: emailValidationResult.errorMessage,
        });
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
