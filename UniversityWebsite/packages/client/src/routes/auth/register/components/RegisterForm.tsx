import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { Button } from "@/components/ui/button/Button";
import { API_URL, ROUTES } from "@/lib/consts";
import { extractErrorMessage } from "@/lib/utils";
import { RegisterPayload } from "@university-website/shared";
import { FormEvent, lazy, Suspense, useRef, useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { registerUser } from "../api";
import { useRegisterStore } from "../store";
import registerFormStyles from "./register_form.module.css";

const PersonalInfoStep = lazy(
    () => import("../components/steps/PersonalInfoStep")
);
const AcademicInfoStep = lazy(
    () => import("../components/steps/AcademicInfoStep")
);
const CredentialsStep = lazy(
    () => import("../components/steps/CredentialsStep")
);

function RegisterForm() {
    const {
        currentStep,
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        universityProgram,
        yearLevel,
        graduationYear,
        honeypot,
        previousStep,
        nextStep,
        validateThirdStep,
        setHoneypot,
    } = useRegisterStore();

    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isPending) {
            return;
        }

        if (!validateThirdStep()) {
            return;
        }

        startTransition(async () => {
            const id = toast.loading("Creating account...");
            try {
                await registerUser({
                    email,
                    password,
                    firstName,
                    lastName,
                    dateOfBirth,
                    gender,
                    universityProgram,
                    yearLevel,
                    graduationYear,
                    honeypot,
                } as RegisterPayload);

                startTransition(() => {
                    toast.success("Account created successfully!", { id });
                    navigate(ROUTES.AUTH.REGISTER_SUCCESS, { replace: true });
                });
            } catch (err) {
                console.error(err);

                startTransition(() => {
                    toast.error(extractErrorMessage(err), { id });
                });
            }
        });
    }

    function onNext() {
        if (currentStep === 3) {
            formRef.current?.requestSubmit();
            return;
        }

        nextStep();
    }

    return (
        <form
            method="POST"
            action={`${API_URL}/auth/login`}
            onSubmit={onSubmit}
            className="form"
            ref={formRef}
            noValidate
        >
            <div className="input-wrapper">
                <Suspense fallback={<LoadingSpinner message="Loading..." />}>
                    {currentStep === 1 && <PersonalInfoStep />}
                    {currentStep === 2 && <AcademicInfoStep />}
                    {currentStep === 3 && <CredentialsStep />}
                </Suspense>
                <input
                    type="text"
                    className="visually-hidden"
                    name="honeypot"
                    id="honeypot"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                />
            </div>
            <div className={registerFormStyles.submitBtnContainer}>
                {currentStep > 1 && (
                    <Button
                        variant="secondary"
                        onClick={previousStep}
                        type="button"
                        disabled={isPending}
                    >
                        Back
                    </Button>
                )}
                <Button
                    variant="primary"
                    onClick={onNext}
                    type="button"
                    disabled={isPending}
                >
                    {currentStep === 3 ? "Create Account" : "Continue"}
                </Button>
            </div>
        </form>
    );
}

export default RegisterForm;
