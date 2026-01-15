import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useAddGoal = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["add-goal"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions }) => {
      return apiRequest("POST", "goals", { dataTransactions }, "", {
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

export default useAddGoal;
