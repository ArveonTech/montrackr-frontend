import { apiRequest } from "@/services/core/apiRequest";

const useGenerateAccessToken = async (accessToken = null) => {
  const response = await apiRequest("POST", "auth/refresh", null, "", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return response;
};

export default useGenerateAccessToken;
