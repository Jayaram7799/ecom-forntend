import apiClient from "../../../services/apiClient";

/**
 *  GET PRODUCTS
 */
export const getProducts = async (params = {}) => {
  try {
    //  Remove empty params
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );

    const response = await apiClient.get("/api/products", {
      params: cleanedParams,
    });

    return response.data?.data?.content || [];
  } catch (error) {
    console.error("Error fetching products:", error);

    throw new Error(
      error.response?.data?.message || "Failed to fetch products",
    );
  }
};

/**
 *  GET CATEGORIES
 */
export const getCategories = async () => {
  try {
    const response = await apiClient.get("/api/categories");
console.log(response.data.data)
    return response.data.data.categories
 || [];
  } catch (error) {
    console.error("Error fetching categories:", error);

    throw new Error(
      error.response?.data?.message || "Failed to fetch categories",
    );
  }
};

/**
 *  GET PRODUCT DETAILS
 */
export const getProductDetails = async (id) => {
  try {
    const response = await apiClient.get(`/api/products/${id}`);

    return response.data?.data || null;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch product details",
    );
  }
};
