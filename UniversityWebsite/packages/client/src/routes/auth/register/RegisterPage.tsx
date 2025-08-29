import { Button } from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import PasswordInput from "@/components/ui/input/PasswordInput";
import Select from "@/components/ui/select/Select";
import { API_URL } from "@/lib/consts";
import { combineClassesOrNone } from "@/lib/utils";
import { Gender } from "@university-website/shared";
import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
import registerStyles from "./register.module.css";
import { useRegisterStore } from "./store";

const DATE_TODAY = new Date().toISOString().split("T")[0];

function RegisterPage() {
    const { currentStep, nextStep } = useRegisterStore();

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <>
            <div
                className={combineClassesOrNone(
                    "card",
                    registerStyles.registerContainer
                )}
            >
                <h1 className="h6">Create an Account</h1>
                <form
                    method="POST"
                    encType="multipart/form-data"
                    action={`${API_URL}/auth/login`}
                    onSubmit={onSubmit}
                    className="form"
                    noValidate
                >
                    <div className="input-wrapper">
                        {currentStep === 1 && <PersonalInfoStep />}
                        {currentStep === 2 && <AcademicInfoStep />}
                        {currentStep === 3 && <CredentialsStep />}
                    </div>
                    <Button
                        variant="primary"
                        onClick={nextStep}
                        type={currentStep === 3 ? "submit" : "button"}
                    >
                        {currentStep === 3 ? "Create Account" : "Continue"}
                    </Button>
                </form>
            </div>
            <div className="card">
                <div className={registerStyles.signInContainer}>
                    Already have an account?{" "}
                    <Link className="link" to="/auth/login">
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    );
}

function PersonalInfoStep() {
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        biography,
        setFirstName,
        setLastName,
        setDateOfBirth,
        setGender,
        setBiography,
    } = useRegisterStore();

    function changeFirstName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setFirstName(value);
    }

    function changeLastName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setLastName(value);
    }

    function changeDateOfBirth(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value ? new Date(e.target.value) : null;
        setDateOfBirth(value);
    }

    function changeGender(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value as Gender | null;

        setGender(value);
    }

    return (
        <>
            <div className="form-input-container">
                <label htmlFor="first-name">First Name</label>
                <Input
                    id="first-name"
                    name="first-name"
                    placeholder="Enter your first name"
                    required
                    value={firstName}
                    onChange={changeFirstName}
                />
            </div>
            <div className="form-input-container">
                <label htmlFor="last-name">Last Name</label>
                <Input
                    id="last-name"
                    name="last-name"
                    placeholder="Enter your last name"
                    required
                    value={lastName}
                    onChange={changeLastName}
                />
            </div>
            <div className="form-input-container">
                <label htmlFor="date-of-birth">Date of Birth</label>
                <Input
                    type="date"
                    id="date-of-birth"
                    name="date-of-birth"
                    required
                    min="1900-01-01"
                    max={DATE_TODAY}
                    value={dateOfBirth?.toISOString().split("T")[0] || ""}
                    onChange={changeDateOfBirth}
                />
            </div>
            <div className="form-input-container">
                <label htmlFor="gender">Gender</label>
                <Select
                    id="gender"
                    name="gender"
                    required
                    defaultValue={gender || ""}
                    onChange={changeGender}
                >
                    <option value="" disabled>
                        Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                </Select>
            </div>
            <div className="form-input-container">
                <label htmlFor="biography">Biography</label>
                <textarea
                    id="biography"
                    name="biography"
                    placeholder="Tell us about yourself"
                    required
                />
            </div>
        </>
    );
}

function AcademicInfoStep() {
    return <></>;
}

function CredentialsStep() {
    const {
        email,
        password,
        setEmail,
        setPassword,
        emailError,
        passwordError,
        setEmailError,
        setPasswordError,
    } = useRegisterStore();

    return (
        <>
            <div className="form-input-container">
                <label htmlFor="email">Email</label>
                <Input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                    }}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    autoCapitalize="off"
                    autoCorrect="off"
                    required
                    aria-errormessage="email-error"
                />
                <small id="email-error" style={{ color: "red" }}>
                    {emailError}
                </small>
            </div>
            <div className="form-input-container">
                <label htmlFor="password">Password</label>
                <PasswordInput
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                    }}
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoFocus
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                    placeholder="Enter your password"
                    required
                    aria-errormessage="password-error"
                />
                <small id="password-error" style={{ color: "red" }}>
                    {passwordError}
                </small>
            </div>
        </>
    );
}

export default RegisterPage;
