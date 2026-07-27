import apiClient from "../../../services/apiClient";

export const getPaymentByOrderId = (orderId) => {
  return apiClient.get(`/api/payments/order/${orderId}`);
};

export const verifyPayment = (payload) => {
  return apiClient.post("/api/payments/verify", payload);
};
