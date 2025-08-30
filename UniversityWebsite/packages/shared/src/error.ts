export type FieldError = {
    fieldName: string;
    message: string;
};

type ErrorCodes = "MISSING_FIELDS";

export type ErrorCode = {
    code: string;
    message: string;
    payload: any[];
};

export const ERROR_CODES = {
    MISSING_FIELDS: {
        code: "MISSING_FIELDS",
        message: "All fields are required.",
        payload: [],
    },
} as const as Record<ErrorCodes, ErrorCode>;

export function isErrorCode(obj: any): obj is ErrorCode {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.code === "string" &&
        typeof obj.message === "string" &&
        Array.isArray(obj.payload)
    );
}
