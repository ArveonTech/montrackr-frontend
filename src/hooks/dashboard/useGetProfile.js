import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = ({ accessToken }) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      apiRequest("GET", "users/me", null, "", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    enabled: true,
    retry: 0,
  });
};

export default useGetProfile;
