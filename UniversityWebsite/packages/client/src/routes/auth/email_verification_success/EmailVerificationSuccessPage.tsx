import CircleCheck from "@/components/svg/CircleCheck";
import { combineClassesOrNone } from "@/lib/utils";
import { Link } from "react-router";
import emailVerificationSuccessStyles from "./email_verification_success.module.css";

function EmailVerificationSuccessPage() {
    return (
        <div
            className={combineClassesOrNone(
                "card",
                emailVerificationSuccessStyles.card
            )}
        >
            <div>
                <div className={emailVerificationSuccessStyles.header}>
                    <h1 className="h6">Email Verification Successful</h1>
                    <CircleCheck />
                </div>
                <p>Your email address has been successfully verified.</p>
            </div>
            <Link to="/auth/login">Go to login</Link>
        </div>
    );
}

export default EmailVerificationSuccessPage;
