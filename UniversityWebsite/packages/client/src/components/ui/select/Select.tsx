import { combineClassesOrNone } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes } from "react";
import selectStyles from "./select.module.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className={combineClassesOrNone(selectStyles.container)}>
                <select
                    className={combineClassesOrNone(
                        selectStyles.select,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
