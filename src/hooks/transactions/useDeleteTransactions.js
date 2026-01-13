import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useDeleteTransactions = ({ handleLoading, handleSuccess }) => {
  return useMutation({
    mutationKey: ["delete-transactions"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions, idTransactions }) => {
      return apiRequest("DELETE", `transactions/${idTransactions}`, { dataTransactions }, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading(false);
      handleSuccess(true);
      queryClient.refetchQueries({
        queryKey: ["get-transactions"],
        exact: false,
      });
    },
    onError: () => {
      handleLoading(false);
    },
  });
};

export default useDeleteTransactions;
