import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from "./routes/IndexPage";
import AuthPage from "./routes/auth/AuthPage";

const NotFound = lazy(() => import("./routes/NotFound"));

const IndexMain = lazy(() => import("@/components/main/index/IndexMain"));
const AboutMain = lazy(() => import("@/components/main/about/AboutMain"));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />}>
                    <Route
                        index
                        element={
                            <Suspense>
                                <IndexMain />
                            </Suspense>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <Suspense>
                                <AboutMain />
                            </Suspense>
                        }
                    />
                </Route>
                <Route path="/auth" element={<AuthPage />} />
                <Route
                    path="*"
                    element={
                        <Suspense>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
