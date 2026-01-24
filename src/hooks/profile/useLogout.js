import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = ({ handleLoading }) => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    retry: 0,
    onMutate: () => {
      handleLoading(true);
    },
    mutationFn: ({ dataUser }) => {
      return apiRequest("POST", "auth/logout", { dataUser }, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      handleLoading(false);
      localStorage.removeItem("access-token");
      navigate("/login");
    },
    onError: () => {
      handleLoading(false);
    },
  });
};

export default useLogout;
