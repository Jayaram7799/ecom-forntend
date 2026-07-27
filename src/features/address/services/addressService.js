import apiClient from "../../../services/apiClient";

export const getMyAddresses = async () => {
  const response = await apiClient.get("/api/addresses/me");

  return response.data;
};
