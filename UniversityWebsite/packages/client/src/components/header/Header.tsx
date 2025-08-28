import { NavLink } from "react-router";
import { AuthButton } from "./auth_button/AuthButton";
import headerStyles from "./header.module.css";
import { Logo } from "./logo/Logo";

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
        <header className={headerStyles.header}>
            <Logo />
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
    );
}
