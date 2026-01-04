import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useRegisterWithCredentials = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["registerWithCredentials"],
    onMutate: () => {
      handleLoading(true);
    },
    retry: 0,
    mutationFn: ({ formRegister }) => {
      return apiRequest("POST", "auth/register", { dataUser: formRegister }, "", {
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

export default useRegisterWithCredentials;
