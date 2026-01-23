import { changeProfile } from "@/features/profile/changeProfileSlice";
import { apiRequest } from "@/services/core/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useUpdateProfileField = ({ handleLoading }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-profile-field"],
    retry: 0,
    onMutate: () => {
      handleLoading && handleLoading(true);
    },
    mutationFn: ({ fieldUser, value, accessToken }) => {
      return apiRequest("PATCH", "users/change-profile", { fieldUser, value }, "", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading && handleLoading(false);
      dispatch(changeProfile({ status: "success", message: "Update profile success" }));
      queryClient.invalidateQueries({ queryKey: ["get-profile"], exact: false });
    },
    onError: () => {
      dispatch(changeProfile({ status: "success", message: "Update profile failed" }));
      handleLoading && handleLoading(false);
    },
  });
};

export default useUpdateProfileField;
