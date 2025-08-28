import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Outlet } from "react-router";

function IndexPage() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default IndexPage;
