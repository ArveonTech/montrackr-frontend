import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useSendOTPFromForgotPassword = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["verify-email-forgot-password"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataUser }) => {
      return apiRequest("POST", "auth/request-otp/forgot-password", { dataUser }, "", {
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

export default useSendOTPFromForgotPassword;
