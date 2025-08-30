import { combineClassesOrNone } from "@/lib/utils";
import { Link, useSearchParams } from "react-router";
import invalidTokenStyles from "./invalid_token.module.css";

function InvalidTokenPage() {
    const [searchParams] = useSearchParams();

    return (
        <div className={combineClassesOrNone("card", invalidTokenStyles.card)}>
            <div>
                <div className={invalidTokenStyles.header}>
                    <h1 className="h6">Received Invalid Token</h1>
                </div>
                <p>The provided verification token cannot be processed.</p>
                <small style={{ color: "gray" }}>
                    Reason: {searchParams.get("reason")}
                </small>
            </div>
            <Link to="/auth/resend-verification">Go request a new one</Link>
        </div>
    );
}

export default InvalidTokenPage;
