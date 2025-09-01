import { combineClassesOrNone } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | "primary"
        | "secondary"
        | "ghost"
        | "destructive"
        | "success"
        | "outline"
        | "default"
        | "cta";
    size?: "small" | "medium" | "large" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={combineClassesOrNone(variant, size, className)}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
