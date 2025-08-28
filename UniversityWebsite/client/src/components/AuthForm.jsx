/**
 * @typedef {Object} Props
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setOpenForm
 */

import { useEffect, useRef, useState } from "react";

/**
 *
 * @param {Props} param0
 */
export default function AuthForm({ setOpenForm }) {
    const [type, setType] = useState("login");

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.showModal();
        }
    }, []);

    const closeModal = () => {
        if (ref.current) {
            ref.current.close();
            setOpenForm(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (ref.current && e.target === ref.current) {
            closeModal();
        }
    };

    return (
        <dialog ref={ref} onClick={handleBackdropClick}>
            <div>
                <h3>
                    {type === "login" ? "Welcome back" : "Create an account"}
                </h3>
                {type === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
        </dialog>
    );
}

function LoginForm() {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return <form onSubmit={onSubmit}></form>;
}

function RegisterForm() {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return <form onSubmit={onSubmit}></form>;
}
