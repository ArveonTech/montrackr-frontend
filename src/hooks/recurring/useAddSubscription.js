import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useAddSubscription = ({ handleLoading } = {}) => {
  return useMutation({
    mutationKey: ["add-subscription"],
    retry: 0,
    onMutate: () => {
      if (handleLoading) handleLoading(true);
    },
    mutationFn: ({ dataTransactions }) => {
      return apiRequest("POST", "subscriptions", { dataTransactions }, "", {
        headers: {
          "Content-Type": "application/json",
        },
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

export default useAddSubscription;
