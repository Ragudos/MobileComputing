import { ROUTES } from "@/lib/consts";
import { useAuth } from "@/lib/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function ProtectedLayout() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(ROUTES.AUTH.LOGIN);
        }
    }, [user]);

    return <Outlet />;
}

export default ProtectedLayout;
