import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { API_URL, ROUTES } from "@/lib/consts";
import { extractErrorMessage } from "@/lib/utils";
import { emailValidator } from "@university-website/shared";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { resendVerificationEmail } from "./api";
import resendVerificationStyles from "./resend_verification.module.css";

function ResendVerificationPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [isPending, startTransition] = useTransition();

    const navigate = useNavigate();

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isPending) {
            return;
        }

        if (!email) {
            setEmailError("Email is required");
            return;
        }

        const validationResult = emailValidator(email);

        if (!validationResult.isValid) {
            setEmailError(validationResult.errorMessage || "");
            return;
        }

        startTransition(async () => {
            const id = toast.loading("Sending verification email...");
            try {
                await resendVerificationEmail(email);

                startTransition(() => {
                    toast.success("Verification email sent successfully!");

                    navigate(
                        ROUTES.AUTH.RESEND_VERIFICATION_SUCCESS +
                            "?email=" +
                            encodeURIComponent(email),
                        {
                            replace: true,
                        }
                    );
                });
            } catch (err) {
                console.error(err);

                startTransition(() => {
                    toast.error(extractErrorMessage(err), { id });
                });
            }
        });
    }

    function changeEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        setEmailError("");
    }

    return (
        <>
            <div className={resendVerificationStyles.container}>
                <div className="card">
                    <div className={resendVerificationStyles.formContainer}>
                        <div>
                            <h1 className="h6">Resend Verification Email</h1>
                            <small>
                                Please enter your email address to receive a new
                                verification link.
                            </small>
                        </div>
                        <form
                            method="POST"
                            action={`${API_URL}/auth/resend-verification`}
                            onSubmit={onSubmit}
                            className="form"
                            noValidate
                        >
                            <div className="input-wrapper">
                                <div className="form-input-container">
                                    <label htmlFor="email">Email Address</label>
                                    <Input
                                        value={email}
                                        onChange={changeEmail}
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        autoCapitalize="none"
                                        spellCheck="false"
                                        placeholder="Enter your email"
                                        required
                                        aria-errormessage="email-error"
                                    />
                                    <InputError
                                        id="email-error"
                                        message={emailError}
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="visually-hidden"
                                    name="honeypot"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    aria-hidden="true"
                                    id="honeypot"
                                    value={honeypot}
                                    onChange={(e) =>
                                        setHoneypot(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                disabled={isPending}
                                type="submit"
                                variant="primary"
                            >
                                Resend
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResendVerificationPage;
