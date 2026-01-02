import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useLoginWithCredentials = (formLogin) => {
  return useQuery({
    queryKey: ["loginWithCredentials"],
    retry: 0,
    queryFn: () => {
      return apiRequest("POST", "auth/login", { dataUser: formLogin }, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    enabled: false,
  });
};

export default useLoginWithCredentials;
