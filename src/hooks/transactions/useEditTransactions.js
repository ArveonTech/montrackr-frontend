import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useEditTransactions = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["edit-transactions"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions, idTransactions }) => {
      return apiRequest("PATCH", `transactions/${idTransactions}`, { dataTransactions }, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading(false);
      queryClient.invalidateQueries({ queryKey: ["get-transactions"], exact: false });
    },
    onError: () => {
      handleLoading(false);
    },
  });
};

export default useEditTransactions;
