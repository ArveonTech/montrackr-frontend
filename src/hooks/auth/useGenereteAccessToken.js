import { apiRequest } from "@/services/core/apiRequest";
import isTokenCheck from "@/utils/auth/isTokenCheck";
import { useQuery } from "@tanstack/react-query";

export const useGenerateAccessToken = (accessToken) => {
  return useQuery({
    queryKey: ["auth-guard"],
    queryFn: () =>
      apiRequest("GET", "auth/refresh", null, "", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    enabled: !accessToken || !isTokenCheck(accessToken),
  });
};

export default useGenerateAccessToken;
