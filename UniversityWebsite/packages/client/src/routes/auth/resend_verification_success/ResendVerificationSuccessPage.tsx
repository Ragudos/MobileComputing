import CircleCheck from "@/components/svg/CircleCheck";
import { combineClassesOrNone } from "@/lib/utils";
import {
    ACCOUNT_VERIFICATION_EXPIRATION_DURATION,
    msToTextDuration,
} from "@university-website/shared";
import { Link, useSearchParams } from "react-router";
import resendVerificationSuccessStyles from "./resend_verification_success.module.css";

function ResendVerificationSuccessPage() {
    const [searchParams] = useSearchParams();

    return (
        <div
            className={combineClassesOrNone(
                "card",
                resendVerificationSuccessStyles.card
            )}
        >
            <div>
                <div className={resendVerificationSuccessStyles.header}>
                    <h1 className="h6">Resend Verification Email</h1>
                    <CircleCheck />
                </div>
                <p>
                    A confirmation email has been resent to your email address{" "}
                    {searchParams.get("email")}. It will expire in{" "}
                    {msToTextDuration(ACCOUNT_VERIFICATION_EXPIRATION_DURATION)}
                </p>
            </div>
            <Link to="/">Go to home</Link>
        </div>
    );
}

export default ResendVerificationSuccessPage;
