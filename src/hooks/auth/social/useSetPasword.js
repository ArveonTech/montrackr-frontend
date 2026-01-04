import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useSetPassword = ({ handleLoading }) => {
  return useMutation({
    mutationKey: ["set-password"],
    onMutate: () => {
      handleLoading(true);
    },
    retry: 0,
    mutationFn: ({ dataUser }) => {
      return apiRequest("POST", "auth/set-password", { dataUser }, "", {
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

export default useSetPassword;
