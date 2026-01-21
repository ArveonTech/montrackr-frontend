import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useGetComparassion = ({ handleLoading } = {}) => {
  return useMutation({
    mutationKey: ["get-comparassion"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions, period }) => {
      return apiRequest("POST", "analytics/comparassion", { dataTransactions }, `period=${period}`, {
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

export default useGetComparassion;
