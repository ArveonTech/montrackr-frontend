import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useDeleteGoal = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["delete-goal"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions }) => {
      return apiRequest("DELETE", "goals", { dataTransactions }, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading(false);
      queryClient.invalidateQueries({ queryKey: ["get-goal"], exact: false });
    },
    onError: () => {
      handleLoading(false);
    },
  });
};

export default useDeleteGoal;
