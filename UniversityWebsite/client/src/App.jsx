import { useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import { useAuth } from "./hooks/useAuth";

const links = [
    { href: "#", label: "Home" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
];

function App() {
    const { user, login, logout } = useAuth();
    const [openForm, setOpenForm] = useState(false);

    return (
        <>
            <header>
                <a href="#">University Website</a>
                <ul>
                    {links.map((link) => (
                        <li key={link.label}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
                {user ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <button onClick={() => setOpenForm(true)}>Login</button>
                )}
            </header>
            <main>{openForm && <AuthForm setOpenForm={setOpenForm} />}</main>
            <footer></footer>
        </>
    );
}

export default App;
