import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "@/utils/auth/ProtectedRoute";
import GuestRoute from "@/utils/auth/GuestRoute";
import LandingPage from "./pages/LandingPage";

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
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
