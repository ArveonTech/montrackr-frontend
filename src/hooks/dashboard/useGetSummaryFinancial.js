import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useGetSummaryFinancial = ({ accessToken, handleLoading }) => {
  return useMutation({
    mutationKey: ["get-summary-financial"],
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions }) => {
      return apiRequest("POST", "analytics/dashboard", { dataTransactions }, "", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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

export default useGetSummaryFinancial;
