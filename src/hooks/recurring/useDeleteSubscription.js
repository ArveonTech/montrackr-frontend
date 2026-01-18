import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useDeleteSubscription = ({ handleLoading } = {}) => {
  return useMutation({
    mutationKey: ["delete-subscription"],
    retry: 0,
    onMutate: () => {
      if (handleLoading) handleLoading(true);
    },
    mutationFn: ({ idSubscription, dataTransactions }) => {
      return apiRequest("DELETE", `subscriptions/${idSubscription}`, {dataTransactions}, "", {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      if (handleLoading) handleLoading(false);
      queryClient.invalidateQueries({ queryKey: ["get-subscriptions"], exact: false });
    },
    onError: () => {
      if (handleLoading) handleLoading(false);
    },
  });
};

export default useDeleteSubscription;
