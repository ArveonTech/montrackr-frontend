import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useSendOTPFromLogin = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["send-otp-login"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataUser }) => {
      return apiRequest("POST", "auth/request-otp/login", { dataUser }, "", {
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

export default useSendOTPFromLogin;
