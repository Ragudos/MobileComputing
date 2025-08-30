import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { Button } from "@/components/ui/button/Button";
import { API_URL } from "@/lib/consts";
import { extractErrorMessage } from "@/lib/utils";
import { FormEvent, lazy, Suspense, useRef, useState } from "react";
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
        program,
        yearLevel,
        graduationYear,
        honeypot,
        previousStep,
        nextStep,
        validateThirdStep,
        setHoneypot,
    } = useRegisterStore();

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        if (!validateThirdStep()) {
            return;
        }

        setIsLoading(true);
        const id = toast.loading("Creating account...");

        try {
            await registerUser({
                email,
                password,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                program,
                yearLevel,
                graduationYear,
                honeypot,
            });

            toast.success("Account created successfully!", { id });

            navigate("/auth/registration_success", { replace: true });
        } catch (err) {
            console.error(err);
            toast.error(extractErrorMessage(err), { id });
        } finally {
            setIsLoading(false);
        }
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
                    type="hidden"
                    name="honeypot"
                    id="honeypot"
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
                        disabled={isLoading}
                    >
                        Back
                    </Button>
                )}
                <Button
                    variant="primary"
                    onClick={onNext}
                    type="button"
                    disabled={isLoading}
                >
                    {currentStep === 3 ? "Create Account" : "Continue"}
                </Button>
            </div>
        </form>
    );
}

export default RegisterForm;
