import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useGetSubscriptions = ({ accessToken, page = 1, limit = 10 } = {}) => {
  return useQuery({
    queryKey: ["get-subscriptions", page, limit],
    queryFn: () =>
      apiRequest("GET", "subscriptions", null, `page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    enabled: true,
    retry: 0,
  });
};

export default useGetSubscriptions;
