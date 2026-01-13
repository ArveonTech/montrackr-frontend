import { Navigate } from "react-router-dom";
import useGenerateAccessToken from "@/hooks/auth/shared/useGenereteAccessToken";
import isTokenCheck from "./isTokenCheck";

const GuestRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken && isTokenCheck(accessToken)) {
    return <Navigate to="/dashboard" replace />;
  }

  const { isLoading, isError, data } = useGenerateAccessToken(accessToken);

  if (isLoading) return null;
  if (isError) return children;
 
  localStorage.setItem("access-token", data?.tokens?.accessToken);
  if (data) return <Navigate to="/dashboard" replace />;

  return children;
};

export default GuestRoute;
