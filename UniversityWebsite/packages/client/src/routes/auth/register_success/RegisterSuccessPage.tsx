import CircleCheck from "@/components/svg/CircleCheck";
import { combineClassesOrNone } from "@/lib/utils";
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
                <p>Your account has been created successfully!</p>
            </div>
            <Link className="link" to="/auth/login">
                Go to Login
            </Link>
        </div>
    );
}

export default RegisterSuccessPage;
