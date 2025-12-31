import axios from "axios";
import { handleApiError } from "./errorHandler";

export const apiRequest = async (method = "GET", resource, data = null, query = "", options = {}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const url = query ? `${baseUrl}/${resource}?${query}` : `${baseUrl}/${resource}`;
  try {
    const response = await axios({
      method,
      url,
      data,
      ...options,
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
