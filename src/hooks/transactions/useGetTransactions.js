import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useGetTransactions = ({ accessToken, query = `page=1&limit=10` }) => {
  return useQuery({
    queryKey: ["get-transactions", query],
    queryFn: () => {
      return apiRequest("GET", "transactions", null, query, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
    },
    enabled: !!accessToken,
  });
};

export default useGetTransactions;
