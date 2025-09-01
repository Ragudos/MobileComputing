import { Link } from "react-router";
import logoStyles from "./logo.module.css";

export function Logo() {
    return (
        <Link to="/" aria-label="Home" title="Home" className={logoStyles.logo}>
            <img
                src="/favicon.ico"
                alt="University Logo"
                width="48"
                height="48"
            />
        </Link>
    );
}
