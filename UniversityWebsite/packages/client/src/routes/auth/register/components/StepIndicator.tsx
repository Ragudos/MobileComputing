import { STEPS } from "../consts";
import { useRegisterStore } from "../store";
import stepIndicatorStyles from "./step_indicator.module.css";

function StepIndicator() {
    const { currentStep } = useRegisterStore();

    return (
        <ol className={stepIndicatorStyles.container}>
            {STEPS.map((step) => {
                return (
                    <li
                        key={step.label}
                        className={stepIndicatorStyles.step}
                        aria-current={
                            step.num === currentStep ? "step" : undefined
                        }
                        aria-label={`Step ${step.num}: ${step.label}`}
                    >
                        <div className={stepIndicatorStyles.icon}>
                            <span> {step.num} </span>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

export default StepIndicator;
