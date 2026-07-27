// features/cart/services/cartService.js

import apiClient from "../../../services/apiClient";

export const getCartApi = () => apiClient.get("/cart");

export const addToCartApi = (productId, quantity = 1) =>
  apiClient.post("/cart/items", null, {
    params: { productId, quantity },
  });

export const incrementCartItemApi = (productId) =>
  apiClient.put("/cart/items/increment", null, {
    params: { productId },
  });

export const decrementCartItemApi = (productId) =>
  apiClient.put("/cart/items/decrement", null, {
    params: { productId },
  });

export const removeCartItemApi = (productId) =>
  apiClient.delete("/cart/items", {
    params: { productId },
  });

export const clearCartApi = () => apiClient.delete("/cart");

export const removePurchasedItemsApi = (productIds) =>
  apiClient.delete("/cart/items/purchased", {
    data: productIds,
  });
