import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoadingSpinner from "./components/loaders/LoadingSpinner";

const NotFound = lazy(() => import("./routes/NotFound"));
const Layout = lazy(() => import("./routes/MainLayout"));
const HomePage = lazy(() => import("./routes/HomePage"));
const AboutPage = lazy(() => import("./routes/about/AboutPage"));
const AuthLayout = lazy(() => import("./routes/auth/AuthLayout"));
const LoginPage = lazy(() => import("./routes/auth/login/LoginPage"));
const RegisterPage = lazy(() => import("./routes/auth/register/RegisterPage"));
const RegisterSuccessPage = lazy(
    () => import("./routes/auth/register_success/RegisterSuccessPage")
);
const EmailVerificationSuccessPage = lazy(
    () =>
        import(
            "./routes/auth/email_verification_success/EmailVerificationSuccessPage"
        )
);
const InvalidTokenPage = lazy(
    () => import("./routes/auth/invalid_token/InvalidTokenPage")
);
const ResendVerificationPage = lazy(
    () => import("./routes/auth/resend_verification/ResendVerificationPage")
);
const ResendVerificationSuccessPage = lazy(
    () =>
        import(
            "./routes/auth/resend_verification_success/ResendVerificationSuccessPage"
        )
);

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
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <HomePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
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
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <LoginPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <RegisterPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="register-success"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <RegisterSuccessPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="email-verification-success"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <EmailVerificationSuccessPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="invalid-token"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <InvalidTokenPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="resend-verification"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <ResendVerificationPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="resend-verification-success"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingSpinner message="Loading..." />
                                }
                            >
                                <ResendVerificationSuccessPage />
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
