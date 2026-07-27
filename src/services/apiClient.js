import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");

      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
