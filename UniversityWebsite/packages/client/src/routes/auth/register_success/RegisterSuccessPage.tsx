import CircleCheck from "@/components/svg/CircleCheck";
import { combineClassesOrNone } from "@/lib/utils";
import {
    ACCOUNT_VERIFICATION_EXPIRATION_DURATION,
    msToTextDuration,
} from "@university-website/shared";
import { Link } from "react-router";
import registerSuccessStyles from "./register_success.module.css";

function RegisterSuccessPage() {
    return (
        <div
            className={combineClassesOrNone("card", registerSuccessStyles.card)}
        >
            <div>
                <div className={registerSuccessStyles.header}>
                    <h1 className="h6">Registration Successful</h1>
                    <CircleCheck />
                </div>
                <p>
                    A confirmation email has been sent to your email address. It
                    will expire in{" "}
                    {msToTextDuration(ACCOUNT_VERIFICATION_EXPIRATION_DURATION)}
                </p>
            </div>
            <Link to="/">Go to home</Link>
        </div>
    );
}

export default RegisterSuccessPage;
