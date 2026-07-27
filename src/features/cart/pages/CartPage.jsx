import { useContext } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import Navbar from "../../../components/Navbar";
import CartContext from "../../../context/CartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const CartPage = () => {
  const { cartList, removeAllCartItems } = useContext(CartContext);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#f1f3f6",
          minHeight: "100vh",
          py: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Container maxWidth="xl">
          {/* HEADER */}

          <Paper
            elevation={1}
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
              mb: 3,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: {
                  xs: "flex-start",
                  md: "center",
                },
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 3,
              }}
            >
              {/* LEFT */}

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Home / Cart
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: "2rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  Shopping Cart
                </Typography>

                <Typography color="text.secondary" mt={0.5}>
                  {cartList.length} {cartList.length === 1 ? "Item" : "Items"}{" "}
                  in your cart
                </Typography>
              </Box>

              {/* RIGHT */}

              {cartList.length > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={removeAllCartItems}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    minWidth: 170,
                    boxShadow: 2,
                    alignSelf: {
                      xs: "stretch",
                      sm: "flex-start",
                      md: "center",
                    },
                  }}
                >
                  Remove All
                </Button>
              )}
            </Box>
          </Paper>

          {/* CONTENT */}

          <Grid container spacing={3} alignItems="flex-start">
            {/* CART ITEMS */}

            <Grid
              size={{
                xs: 12,
                lg: 8.5,
              }}
            >
              <Stack spacing={2.5}>
                {cartList.map((item) => (
                  <CartItem key={item.productId} cartDetails={item} />
                ))}
              </Stack>
            </Grid>

            {/* SUMMARY */}

            <Grid
              size={{
                xs: 12,
                lg: 3.5,
              }}
            >
              <Box
                sx={{
                  position: {
                    xs: "static",
                    lg: "sticky",
                  },
                  top: 90,
                }}
              >
                <CartSummary />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CartPage;
