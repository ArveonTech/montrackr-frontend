import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useAddTransactions = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["add-transactions"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions }) => {
      return apiRequest("POST", "transactions", { dataTransactions }, "", {
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

export default useAddTransactions;
