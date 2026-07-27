import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import { getProductDetails } from "../../products/services/productService";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [data, setData] = useState(null); // 🔥 full response
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductDetails(id);
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const product = data?.product;
  const similarProducts = data?.similarProducts || [];

  //  Loading
  if (loading) {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  //  Error
  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  //  No product
  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography>No product found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 5, px: 2 }}>
        {/*  MAIN PRODUCT */}
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            boxShadow: 3,
            mb: 4,
          }}
        >
          {/* IMAGE */}
          <Box sx={{ flex: 1, p: 2 }}>
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt={product.name}
              sx={{
                width: "100%",
                height: 300,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
              }}
            />
          </Box>

          {/* DETAILS */}
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              {product.description}
            </Typography>

            <Typography variant="h6" color="primary" mt={2}>
              ₹ {product.price}
            </Typography>

            <Typography variant="body2" mt={1}>
              Rating: ⭐ {product.rating || "N/A"}
            </Typography>
          </CardContent>
        </Card>

        {/*  SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <>
            <Typography variant="h6" mb={2}>
              Similar Products
            </Typography>

            <Grid container spacing={2}>
              {similarProducts.map((item) => (
                <Grid item="true" xs={12} sm={6} md={3} key={item.id}>
                  <Card sx={{ p: 1 }}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.name}
                      sx={{
                        height: 150,
                        objectFit: "contain",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                    <CardContent>
                      <Typography variant="body2">{item.name}</Typography>
                      <Typography variant="subtitle2" color="primary">
                        ₹ {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default ProductDetailsPage;
