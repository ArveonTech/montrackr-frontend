import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useGetSubscription = ({ accessToken, id, enabled = true } = {}) => {
  return useQuery({
    queryKey: ["get-subscription", id],
    queryFn: () =>
      apiRequest("GET", `subscriptions/${id}`, null, "", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    enabled: !!id && enabled,
    retry: 0,
  });
};

export default useGetSubscription;
