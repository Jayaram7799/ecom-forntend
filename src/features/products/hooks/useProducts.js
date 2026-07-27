import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";

export default function useProducts(params) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await apiClient.get("/api/products", {
          params,
        });

        const data = res.data?.data;

        setProducts(data?.content || []);
        setTotalPages(data?.totalPages || 0);
      } catch (err) {
        console.error("Product fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return { products, totalPages, loading };
}
