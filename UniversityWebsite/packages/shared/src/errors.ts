export class GenericError {
    constructor(
        public message: string,
        public code?: string
    ) {}

    public static isGenericError(err: unknown): err is GenericError {
        return (
            err instanceof GenericError ||
            (typeof err === "object" &&
                err !== null &&
                "message" in err &&
                typeof (err as GenericError).message === "string" &&
                ("code" in err
                    ? typeof (err as GenericError).code === "string"
                    : true))
        );
    }
}
