import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dwnccnjdwck00.cloudfront.net",
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
