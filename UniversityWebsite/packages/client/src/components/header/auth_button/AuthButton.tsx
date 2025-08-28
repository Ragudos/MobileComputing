import { Button } from "@/components/ui/button/Button";
import { useAuth } from "@/lib/hooks";
import { useNavigate } from "react-router";

export function AuthButton() {
    const { user } = useAuth();

    return <>{user ? <ProfileButton /> : <LoginButton />}</>;
}

function ProfileButton() {
    return <></>;
}

function LoginButton() {
    const navigate = useNavigate();

    function onClick() {
        navigate("/auth/login");
    }

    return <Button onClick={onClick}>Login</Button>;
}
