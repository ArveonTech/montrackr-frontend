import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useSendOTPFromRegister = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["send-otp-register"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataUser }) => {
      return apiRequest("POST", "auth/request-otp/register", { dataUser }, "", {
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

export default useSendOTPFromRegister;
