import LogoutIcon from "@/components/svg/LogoutIcon";
import UserCircle from "@/components/svg/UserCircle";
import UserIcon from "@/components/svg/UserIcon";
import { Button } from "@/components/ui/button/Button";
import { API_URL, ROUTES } from "@/lib/consts";
import { useAuth } from "@/lib/hooks";
import { extractErrorMessage } from "@/lib/utils";
import { DropdownMenu } from "radix-ui";
import { useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function AuthButton() {
    const { user } = useAuth();

    return <>{user ? <ProfileButton /> : <LoginButton />}</>;
}

function ProfileButton() {
    const navigate = useNavigate();
    const { refetch } = useAuth();
    const [_, startTransition] = useTransition();

    function goToProfile() {
        startTransition(() => {
            navigate(ROUTES.PROTECTED.PROFILE);
        });
    }

    function logout() {
        startTransition(async () => {
            try {
                await fetch(`${API_URL}/auth/logout`, {
                    credentials: "include",
                    method: "DELETE",
                });

                startTransition(async () => {
                    const { error } = await refetch();

                    if (error) {
                        console.error(error);

                        toast.error(
                            extractErrorMessage("Something went wrong")
                        );
                        return;
                    }

                    startTransition(() => {
                        navigate(ROUTES.AUTH.LOGIN, { replace: true });
                    });
                });
            } catch (error) {
                console.error(error);

                toast.error(extractErrorMessage("Something went wrong"));
            }
        });
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button variant="ghost" size="icon">
                    <UserCircle />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    arrowPadding={4}
                    sideOffset={8}
                    className="dropdown"
                >
                    <DropdownMenu.Arrow />
                    <DropdownMenu.Label className="dropdown-label">
                        User Menu
                    </DropdownMenu.Label>
                    <DropdownMenu.Group className="dropdown-group">
                        <DropdownMenu.Item asChild>
                            <Button onClick={goToProfile} variant="ghost">
                                <span>Profile</span>
                                <UserIcon />
                            </Button>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                            <Button onClick={logout} variant="ghost">
                                <span>Logout</span>
                                <LogoutIcon />
                            </Button>
                        </DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

function LoginButton() {
    const navigate = useNavigate();

    function onClick() {
        navigate("/auth/login");
    }

    return <Button onClick={onClick}>Login</Button>;
}
