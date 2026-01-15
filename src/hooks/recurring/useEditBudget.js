import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useEditBudget = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["edit-budgets"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions }) => {
      return apiRequest("PATCH", "budgets", { dataTransactions }, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading(false);
      queryClient.invalidateQueries({ queryKey: ["get-budgets"], exact: false });
    },
    onError: () => {
      handleLoading(false);
    },
  });
};

export default useEditBudget;
