import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import apiClient from "../../../services/apiClient";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await apiClient.get("/api/products");

      const products = response.data.data.content;
      setProducts(products.slice(0, 8));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" mb={4}>
        Featured Products
      </Typography>

      <Grid container spacing={3} p={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="220"
                image={product.imageUrl}
              />

              <CardContent>
                <Typography noWrap>{product.name}</Typography>

                <Typography color="primary" fontWeight="bold">
                  ₹{product.price}
                </Typography>

                <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                  Add To Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FeaturedProducts;
