import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useGetGoal = ({ accessToken }) => {
  return useQuery({
    queryKey: ["get-goal"],
    queryFn: () =>
      apiRequest("GET", "goals", null, "", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    enabled: true,
    retry: 0,
  });
};

export default useGetGoal;
