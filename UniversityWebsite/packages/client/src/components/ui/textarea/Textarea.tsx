import { combineClassesOrNone } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";
import textareaStyles from "./textarea.module.css";

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className={textareaStyles.container}>
                <textarea
                    ref={ref}
                    className={combineClassesOrNone(
                        textareaStyles.textarea,
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export default Textarea;
