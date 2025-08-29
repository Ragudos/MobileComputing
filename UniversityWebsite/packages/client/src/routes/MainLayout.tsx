import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Outlet } from "react-router";

function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;
