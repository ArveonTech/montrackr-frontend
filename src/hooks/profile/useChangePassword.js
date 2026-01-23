import { changeProfile } from "@/features/profile/changeProfileSlice";
import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useChangePassword = ({ handleLoading } = {}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["change-password"],
    onMutate: () => {
      handleLoading && handleLoading(true);
    },
    mutationFn: ({ dataUser, accessToken }) => {
      return apiRequest("POST", "auth/change-password", { dataUser }, "", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading && handleLoading(false);
      dispatch(changeProfile({ status: "success", message: "Change password success" }));
      queryClient.invalidateQueries({ queryKey: ["get-profile"], exact: false });
    },
    onError: () => {
      dispatch(changeProfile({ status: "failed", message: "Change password failed" }));
      handleLoading && handleLoading(false);
    },
    retry: 0,
  });
};

export default useChangePassword;
