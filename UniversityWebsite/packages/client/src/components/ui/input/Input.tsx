import { combineClassesOrNone, setRefs } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useRef } from "react";
import inputStyles from "./input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const localRef = useRef<HTMLInputElement>(null);

        return (
            <div
                className={inputStyles.container}
                onClick={() => localRef.current?.focus()}
            >
                <input
                    ref={setRefs(ref, localRef)}
                    className={combineClassesOrNone(
                        inputStyles.input,
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
