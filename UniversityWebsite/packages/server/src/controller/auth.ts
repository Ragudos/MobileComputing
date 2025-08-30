import { CustomRequest } from "@/types";
import {
    emailValidator,
    ERROR_CODES,
    MissingField,
    passwordValidator,
    RegisterPayload,
    REQUIRED_REGISTER_FIELDS,
} from "@university-website/shared";
import { Request, Response } from "express";
import { ErrorCode } from "../../../shared/src/error";

export async function loginRoute(req: Request, res: Response) {
    res.status(200).json({ message: "User logged in successfully" });
}

export async function registerRoute(
    req: CustomRequest<RegisterPayload>,
    res: Response
) {
    const body = req.body;

    if (body.honeypot) {
        return res.status(400).json({
            message: "Request cannot be processed. Please try again later.",
        });
    }

    const missingFields = Object.entries(REQUIRED_REGISTER_FIELDS)
        .filter(([key, _]) => !body[key as keyof RegisterPayload])
        .map(([key, label]) => ({
            fieldName: key,
            message: `${label} is required`,
        })) as MissingField[];

    if (missingFields.length > 0) {
        return res.status(400).json({
            code: ERROR_CODES.MISSING_FIELDS.code,
            message: ERROR_CODES.MISSING_FIELDS.message,
            payload: missingFields,
        } as ErrorCode);
    }

    const invalidFields = Object.entries(body).map(([key, value]) => {
        if (key === "email") {
            const validationResult = emailValidator(value as string);

            return validationResult.isValid
                ? null
                : {
                      fieldName: key,
                      message: validationResult.errorMessage,
                  };
        }

        if (key === "password") {
            const validationResult = passwordValidator(value as string);

            return validationResult.isValid
                ? null
                : {
                      fieldName: key,
                      message: validationResult.errorMessage,
                  };
        }
    });

    if (invalidFields.length > 0) {
        return res.status(400).json({
            code: ERROR_CODES.INVALID_FIELDS.code,
            message: ERROR_CODES.INVALID_FIELDS.message,
            payload: invalidFields,
        } as ErrorCode);
    }

    res.status(200).json({ message: "hi" });
}

export async function logoutRoute(req: Request, res: Response) {
    res.status(200).json({ message: "User logged out successfully" });
}
