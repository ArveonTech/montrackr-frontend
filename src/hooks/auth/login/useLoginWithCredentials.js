import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useLoginWithCredentials = (formLogin, handleLoading) => {
  return useMutation({
    mutationKey: ["loginWithCredentials"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: () => {
      return apiRequest("POST", "auth/login", { dataUser: formLogin }, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading(false);
    },
    onError: () => {
      handleLoading(false);
    },
  });
};

export default useLoginWithCredentials;
