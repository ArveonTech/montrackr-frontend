import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "@/utils/auth/ProtectedRoute";
import GuestRoute from "@/utils/auth/GuestRoute";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/login/LoginPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import SetPasswordPage from "./pages/auth/social/SetPasswordPage";
import VerifyOTPLoginPage from "./pages/auth/login/VerifyOTPLoginPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <GuestRoute>
      <LandingPage />
      // </GuestRoute>
    ),
  },
  {
    path: "/login",
    element: (
      // <GuestRoute>
      <LoginPage />
      // </GuestRoute>
    ),
  },
  {
    path: "/verify-otp-login",
    element: (
      // <GuestRoute>
      <VerifyOTPLoginPage />
      // </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      // <GuestRoute>
      <RegisterPage />
      // </GuestRoute>
    ),
  },
  {
    path: "/set-password",
    element: (
      // <GuestRoute>
      <SetPasswordPage />
      // </GuestRoute>
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
