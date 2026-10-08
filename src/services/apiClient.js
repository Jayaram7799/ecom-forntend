import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://13.203.17.131/:9090",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request");

      localStorage.removeItem("token");

      // Optional:
      // localStorage.removeItem("user");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
