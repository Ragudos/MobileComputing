import InputError from "@/components/InputError";
import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import { DATE_TODAY } from "@/lib/consts";
import {
    Gender,
    MAX_FIRST_NAME,
    MAX_LAST_NAME,
} from "@university-website/shared";
import { ChangeEvent } from "react";
import { useRegisterStore } from "../../store";

function PersonalInfoStep() {
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        firstNameError,
        lastNameError,
        dateOfBirthError,
        genderError,
        setFirstNameError,
        setLastNameError,
        setDateOfBirthError,
        setGenderError,
        setFirstName,
        setLastName,
        setDateOfBirth,
        setGender,
    } = useRegisterStore();

    function changeFirstName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setFirstName(value);
        setFirstNameError("");
    }

    function changeLastName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setLastName(value);
        setLastNameError("");
    }

    function changeDateOfBirth(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value ? new Date(e.target.value) : null;

        setDateOfBirth(value);
        setDateOfBirthError("");
    }

    function changeGender(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value as Gender | null;

        setGender(value);
        setGenderError("");
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
                    autoComplete="given-name"
                    value={firstName}
                    onChange={changeFirstName}
                    aria-errormessage="first-name-error"
                    maxLength={MAX_FIRST_NAME}
                />
                <InputError id="first-name-error" message={firstNameError} />
            </div>
            <div className="form-input-container">
                <label htmlFor="last-name">Last Name</label>
                <Input
                    id="last-name"
                    name="last-name"
                    placeholder="Enter your last name"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={changeLastName}
                    aria-errormessage="last-name-error"
                    maxLength={MAX_LAST_NAME}
                />
                <InputError id="last-name-error" message={lastNameError} />
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
                    aria-errormessage="date-of-birth-error"
                />
                <InputError
                    id="date-of-birth-error"
                    message={dateOfBirthError}
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
                    aria-errormessage="gender-error"
                >
                    <option value="" disabled>
                        Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                </Select>
                <InputError id="gender-error" message={genderError} />
            </div>
        </>
    );
}

export default PersonalInfoStep;
