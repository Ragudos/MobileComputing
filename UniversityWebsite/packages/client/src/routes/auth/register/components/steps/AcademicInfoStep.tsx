import InputError from "@/components/InputError";
import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import { YEAR_TODAY } from "@/lib/consts";
import {
    MAX_YEAR_LEVEL,
    MIN_YEAR_LEVEL,
    UNIVERSITY_PROGRAMS,
    UniversityProgram,
} from "@university-website/shared";
import { ChangeEvent } from "react";
import { useRegisterStore } from "../../store";

function AcademicInfoStep() {
    const {
        universityProgram,
        setUniversityProgram,
        programError,
        setProgramError,
        yearLevel,
        setYearLevel,
        yearLevelError,
        setYearLevelError,
        graduationYear,
        setGraduationYear,
        graduationYearError,
        setGraduationYearError,
    } = useRegisterStore();

    function changeProgram(e: ChangeEvent<HTMLSelectElement>) {
        setUniversityProgram((e.target.value as UniversityProgram) || null);
        setProgramError("");
    }

    function changeYearLevel(e: ChangeEvent<HTMLInputElement>) {
        setYearLevel(+e.target.value);
        setYearLevelError("");
    }

    function changeGraduationYear(e: ChangeEvent<HTMLInputElement>) {
        setGraduationYear(+e.target.value);
        setGraduationYearError("");
    }

    return (
        <>
            <div className="form-input-container">
                <label htmlFor="program">Program*</label>
                <Select
                    id="program"
                    name="program"
                    required
                    defaultValue={universityProgram || ""}
                    onChange={changeProgram}
                    aria-errormessage="program-error"
                >
                    <option value="" disabled>
                        Select your program
                    </option>
                    {UNIVERSITY_PROGRAMS.map((prog) => (
                        <option key={prog} value={prog}>
                            {prog}
                        </option>
                    ))}
                </Select>
                <InputError id="program-error" message={programError} />
            </div>
            <div className="form-input-container">
                <label htmlFor="year-level">Year Level*</label>
                <Input
                    id="year-level"
                    name="year-level"
                    placeholder="Enter your year level"
                    required
                    type="number"
                    min={MIN_YEAR_LEVEL}
                    max={MAX_YEAR_LEVEL}
                    value={yearLevel}
                    onChange={changeYearLevel}
                    aria-errormessage="year-level-error"
                />
                <InputError id="year-level-error" message={yearLevelError} />
            </div>
            <div className="form-input-container">
                <label htmlFor="graduation-year">Graduation Year*</label>
                <Input
                    id="graduation-year"
                    name="graduation-year"
                    placeholder="Enter your graduation year"
                    required
                    type="number"
                    min={YEAR_TODAY}
                    value={graduationYear}
                    onChange={changeGraduationYear}
                    aria-errormessage="graduation-year-error"
                />
                <InputError
                    id="graduation-year-error"
                    message={graduationYearError}
                />
            </div>
        </>
    );
}

export default AcademicInfoStep;
