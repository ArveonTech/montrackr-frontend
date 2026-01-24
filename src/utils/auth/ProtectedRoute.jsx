import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useGenerateAccessToken from "@/hooks/auth/shared/useGenereteAccessToken";
import isTokenCheck from "./isTokenCheck";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken && isTokenCheck(accessToken)) {
    return children;
  }

  const { isLoading, isError, data } = useGenerateAccessToken(accessToken);

  useEffect(() => {
    if (data?.tokens?.accessToken) {
      const newToken = data?.tokens?.accessToken;
      // localStorage.setItem("access-token", newToken);
    }
  }, [data]);

  if (isLoading) return null;

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (data?.tokens?.accessToken) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
