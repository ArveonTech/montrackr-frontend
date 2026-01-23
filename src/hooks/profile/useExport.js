import { apiRequest } from "@/services/core/apiRequest";
import { useMutation } from "@tanstack/react-query";

const useExport = () => {
  return useMutation({
    mutationKey: ["export-transactions"],
    mutationFn: async ({ startRange, endRange, accessToken }) => {
      // use apiRequest with responseType blob
      const query = `startRange=${encodeURIComponent(startRange)}&endRange=${encodeURIComponent(endRange)}`;
      return apiRequest("GET", "transactions/export", null, query, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
        withCredentials: true,
      });
    },
    retry: 0,
  });
};

export default useExport;
