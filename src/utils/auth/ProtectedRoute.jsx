import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import isTokenCheck from "./isTokenCheck";
import useGenerateAccessToken from "@/hooks/auth/useGenereteAccessToken";

const GuestRoute = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const accessToken = localStorage.getItem("access-token");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["auth-guard"],
    queryFn: useGenerateAccessToken,
    enabled: !accessToken || !isTokenCheck(accessToken),
  });

  useEffect(() => {
    if (isPending) {
      setStatus("loading");
    } else if (isError) {
      setStatus("error");
    } else if (data) {
      setStatus("success");
    }
  }, [isPending, isError, data, error]);

  if (status === "loading") return null;

  if (status === "error") return null;

  if (status !== "valid") return <Navigate to="/home" replace />;

  return children;
};

export default GuestRoute;
