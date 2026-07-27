import apiClient from "../../../services/apiClient";

export const loginUser = async (formData) => {
  const response = await apiClient.post("/auth/login", formData);
  return response.data;
};

export const checkEmailExist = async (email) => {
  const res = await apiClient.get(`/auth/check-email?email=${email}`);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await apiClient.post(`/auth/activate`, data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await apiClient.post("/api/users/create", data);
  return res.data;
};

export const getMyProfile = async (token) => {
  const response = await apiClient.get("/api/users/me");
  return response.data;
};