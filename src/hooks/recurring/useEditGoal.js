import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useEditGoal = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["edit-goal"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataTransactions }) => {
      return apiRequest("PATCH", "goals", { dataTransactions }, "", {
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

export default useEditGoal;
