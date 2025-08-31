import { ROUTES } from "@/lib/consts";
import { useAuth } from "@/lib/hooks";
import { Navigate, Outlet } from "react-router";

function ProtectedLayout() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
    }

    return <Outlet />;
}

export default ProtectedLayout;
