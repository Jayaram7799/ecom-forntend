import apiClient from "../../../services/apiClient";

// Login
export const loginUser = async (formData) => {
  const response = await apiClient.post("/auth/login", formData);
  return response.data;
};

// Check Email
export const checkEmailExist = async (email) => {
  const response = await apiClient.get("/auth/check-email", {
    params: {
      email,
    },
  });

  return response.data;
};

// Account Activation
export const activateAccount = async (data) => {
  const response = await apiClient.post("/auth/activate", data);
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await apiClient.post("/auth/reset-password", data);
  return response.data;
};

// Signup
export const signupUser = async (data) => {
  const response = await apiClient.post("/api/users", data);
  return response.data;
};

// Get My Profile
export const getMyProfile = async () => {
  const response = await apiClient.get("/api/users/me");
  return response.data;
};
// forgot-password
export const forgotPassword = async (data) => {
  const response = await apiClient.post("/auth/forgot-password", data);

  return response.data;
};
