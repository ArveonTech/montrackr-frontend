import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const usePaySubscription = ({ handleLoading } = {}) => {
  return useMutation({
    mutationKey: ["pay-subscription"],
    retry: 0,
    onMutate: () => {
      if (handleLoading) handleLoading(true);
    },
    mutationFn: ({ dataTransactions, idSubscription }) => {
      return apiRequest("PATCH", `subscriptions/payment/${idSubscription}`, { dataTransactions }, "", {
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

export default usePaySubscription;
