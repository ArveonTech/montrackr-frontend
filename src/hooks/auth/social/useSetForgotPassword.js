import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useSetPasswordForgotPassword = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["set-password-forgot-password"],
    onMutate: () => {
      handleLoading(true);
    },
    retry: 0,
    mutationFn: ({ dataUser }) => {
      return apiRequest("POST", "auth/set-password/forgot-password", { dataUser }, "", {
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

export default useSetPasswordForgotPassword;
