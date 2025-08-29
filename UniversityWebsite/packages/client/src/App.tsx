import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const NotFound = lazy(() => import("./routes/NotFound"));
const Layout = lazy(() => import("./routes/MainLayout"));
const HomePage = lazy(() => import("./routes/HomePage"));
const AboutPage = lazy(() => import("./routes/about/AboutPage"));
const AuthLayout = lazy(() => import("./routes/auth/AuthLayout"));
const LoginPage = lazy(() => import("./routes/auth/login/LoginPage"));
const RegisterPage = lazy(() => import("./routes/auth/register/RegisterPage"));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense>
                            <Layout />
                        </Suspense>
                    }
                >
                    <Route
                        index
                        element={
                            <Suspense>
                                <HomePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <Suspense>
                                <AboutPage />
                            </Suspense>
                        }
                    />
                </Route>
                <Route
                    path="/auth"
                    element={
                        <Suspense>
                            <AuthLayout />
                        </Suspense>
                    }
                >
                    <Route
                        path="login"
                        element={
                            <Suspense>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <Suspense>
                                <RegisterPage />
                            </Suspense>
                        }
                    />
                </Route>
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
