import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "@/utils/auth/ProtectedRoute";
import GuestRoute from "@/utils/auth/GuestRoute";
import LandingPage from "./pages/landing/LandingPage";
import NotFoundPage from "./pages/others/NotFoundPage";
import LoginPage from "./pages/auth/login/LoginPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import SetPasswordPage from "./pages/auth/social/SetPasswordPage";
import VerifyOTPLoginPage from "./pages/auth/login/VerifyOTPLoginPage";
import VerifyOTPRegisterPage from "./pages/auth/register/VerifyOTPRegisterPage";
import EmailInputPage from "./pages/auth/forgot-password/EmailInputPage";
import VerifyOTPForgotPasswordPage from "./pages/auth/forgot-password/VerifyOTPForgotPasswordPage";
import SetPasswordForgotPasswordPage from "./pages/auth/forgot-password/SetPasswordForgotPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestRoute>
        <LandingPage />
      </GuestRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/verify-otp-login",
    element: (
      <GuestRoute>
        <VerifyOTPLoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "/verify-otp-register",
    element: (
      <GuestRoute>
        <VerifyOTPRegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "/set-password",
    element: (
      <GuestRoute>
        <SetPasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: "/email-verify",
    element: (
      <GuestRoute>
        <EmailInputPage />
      </GuestRoute>
    ),
  },
  {
    path: "/verify-otp-forgot-password",
    element: (
      <GuestRoute>
        <VerifyOTPForgotPasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: "/set-password-forgot-password",
    element: (
      <GuestRoute>
        <SetPasswordForgotPasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: "/set-password-forgot-password",
    element: (
      <GuestRoute>
        <SetPasswordForgotPasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <TransactionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
