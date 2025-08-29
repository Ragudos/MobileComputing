import { combineClassesOrNone } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import buttonStyles from "./button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | "primary"
        | "secondary"
        | "ghost"
        | "destructive"
        | "success"
        | "outline"
        | "default";
    size?: "small" | "medium" | "large" | "icon" | "any";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "any", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={combineClassesOrNone(
                    buttonStyles.button,
                    buttonStyles[variant],
                    buttonStyles[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
