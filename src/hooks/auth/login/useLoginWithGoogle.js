import { apiRequest } from "@/services/core/apiRequest";
import { useQuery } from "@tanstack/react-query";

const useLoginWithGoogle = () => {
  return useQuery({
    queryKey: ["loginWithGoogle"],
    retry: 0,
    queryFn: () => {
      return apiRequest("POST", "auth/google", null, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    enabled: false,
  });
};

export default useLoginWithGoogle;
