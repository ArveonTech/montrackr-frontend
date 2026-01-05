import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useVerifyOTPFromForgotPassword = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["verify-otp-register"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataUser }) => {
      return apiRequest("POST", "auth/verify-otp/forgot-password", { dataUser }, "", {
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

export default useVerifyOTPFromForgotPassword;
