import { combineClassesOrNone } from "@/lib/utils";
import { NavLink } from "react-router";
import { AuthButton } from "./auth_button/AuthButton";
import headerStyles from "./header.module.css";
import { Logo } from "./logo/Logo";
import ClickSpark from "@/components/react-bits/ClickSpark";

type NavigationLink = {
    title: string;
    path: string;
};

export const NAVIGATION_LINKS: NavigationLink[] = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "About",
        path: "/about",
    },
];

export function Header() {

    return (
        <ClickSpark
            sparkColor='#44bf98'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
        >
            <header
                className={combineClassesOrNone("container", headerStyles.header)}
            >
                <div className={headerStyles.logoContainer}>
                    <Logo />
                    <h4 className={combineClassesOrNone("container", headerStyles.universityName)}>Sigma University</h4>
                </div>
                <nav className={headerStyles.navigation}>
                    <ul className={headerStyles.navigationList}>
                        {NAVIGATION_LINKS.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    title={link.title}
                                    aria-label={link.title}
                                    to={link.path}
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <AuthButton />
                </nav>
            </header>
        </ClickSpark>
            );
}