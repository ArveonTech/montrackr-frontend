import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useGetBudget = ({ accessToken }) => {
  return useQuery({
    queryKey: ["get-budgets"],
    queryFn: () =>
      apiRequest("GET", "budgets", null, "", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    enabled: true,
    retry: 0,
  });
};

export default useGetBudget;
