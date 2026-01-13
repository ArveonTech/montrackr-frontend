import { apiRequest } from "@/services/core/apiRequest";
import isTokenCheck from "@/utils/auth/isTokenCheck";
import { useQuery } from "@tanstack/react-query";

const useGenerateAccessToken = (accessToken) => {
  return useQuery({
    queryKey: ["auth-guard"],
    queryFn: () =>
      apiRequest("GET", "auth/refresh", null, "", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    enabled: !accessToken || !isTokenCheck(accessToken),
    retry: 0,
  });
};

export default useGenerateAccessToken;
