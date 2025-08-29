import Eye from "@/components/svg/Eye";
import EyeSlash from "@/components/svg/EyeSlash";
import { combineClassesOrNone, setRefs } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useRef, useState } from "react";
import { Button } from "../button/Button";
import inputStyles from "./input.module.css";
import passwordInputStyles from "./password_input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    passwordToggle?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, passwordToggle = false, ...props }, ref) => {
        const [show, setShow] = useState(false);
        const localRef = useRef<HTMLInputElement>(null);

        function toggleType() {
            const input = localRef.current;
            if (!input) return;

            // save cursor position
            const start = input.selectionStart;
            const end = input.selectionEnd;

            // toggle
            setShow((s) => !s);

            // restore cursor on next tick
            requestAnimationFrame(() => {
                if (
                    input.selectionStart !== null &&
                    start !== null &&
                    end !== null
                ) {
                    input.setSelectionRange(start, end);
                }
            });
        }

        return (
            <div
                onClick={() => localRef.current?.focus()}
                className={combineClassesOrNone(
                    inputStyles.container,
                    passwordInputStyles.container
                )}
            >
                <input
                    ref={setRefs(ref, localRef)}
                    className={combineClassesOrNone(
                        inputStyles.input,
                        passwordInputStyles.input,
                        className
                    )}
                    {...props}
                    type={show ? "text" : "password"}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={passwordInputStyles.toggle}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleType();
                    }}
                >
                    {show ? <EyeSlash /> : <Eye />}
                </Button>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
