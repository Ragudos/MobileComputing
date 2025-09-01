import { ROUTES } from "@/lib/consts";
import { useAuth } from "@/lib/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function ProtectedLayout() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !isLoading) {
            navigate(ROUTES.AUTH.LOGIN);
        }
    }, [user, isLoading]);

    if (isLoading) {
        return null;
    }

    return <Outlet />;
}

export default ProtectedLayout;
