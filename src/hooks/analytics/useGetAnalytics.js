import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useGetAnalytics = ({ handleLoading } = {}) => {
  return useMutation({
    mutationKey: ["get-analytics"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions, type, startRange, endRange }) => {
      return apiRequest("POST", "analytics/chartAnalytics", { dataTransactions }, `type=${type}&startRange=${startRange}&endRange=${endRange}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading(false);
    },
    onError: () => {
      handleLoading(false);
    },
  });
};

export default useGetAnalytics;
