import { useContext } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Checkbox from "@mui/material/Checkbox";

import CartContext from "../../../context/CartContext";

const CartItem = ({ cartDetails }) => {
  const {
    selectedCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
    toggleCartSelection,
  } = useContext(CartContext);

  const quantity = cartDetails.quantity;
  const sellingPrice = Number(cartDetails.price);

  // Replace these with backend values later
  const originalPrice = sellingPrice + 500;

  const discount = Math.round(
    ((originalPrice - sellingPrice) / originalPrice) * 100,
  );

  const totalPrice = sellingPrice * quantity;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        mb: 3,
        transition: "all .25s ease",
        "&:hover": {
          boxShadow: "0 8px 28px rgba(0,0,0,.10)",
        },
      }}
    >
      <Checkbox
        checked={selectedCartItems.includes(cartDetails.productId)}
        onChange={() => toggleCartSelection(cartDetails.productId)}
        color="primary"
        sx={{
          transform: "scale(1.2)",
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={4}
        >
          {/* IMAGE SECTION */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: 220,
              },
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={cartDetails.imageUrl}
              alt={cartDetails.name}
              sx={{
                width: {
                  xs: 180,
                  sm: 220,
                  md: 180,
                },
                height: {
                  xs: 180,
                  sm: 220,
                  md: 180,
                },
                objectFit: "contain",
                mx: "auto",
              }}
            />

            {/* QUANTITY */}

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              mt={3}
            >
              <IconButton
                disabled={quantity <= 1}
                onClick={() => decrementCartItemQuantity(cartDetails.productId)}
                sx={{
                  border: "1px solid #dcdcdc",
                  bgcolor: "#fafafa",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
              >
                <RemoveIcon />
              </IconButton>

              <Box
                sx={{
                  width: 56,
                  height: 42,
                  border: "1px solid #dcdcdc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {quantity}
              </Box>

              <IconButton
                onClick={() => incrementCartItemQuantity(cartDetails.productId)}
                sx={{
                  border: "1px solid #dcdcdc",
                  bgcolor: "#fafafa",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* PRODUCT DETAILS */}

          <Box flex={1}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                transition: ".2s",
                "&:hover": {
                  color: "#2874f0",
                  cursor: "pointer",
                },
              }}
            >
              {cartDetails.name}
            </Typography>

            <Typography mt={1} color="text.secondary" fontSize={14}>
              Seller: CC Collection
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mt={2}
              flexWrap="wrap"
            >
              <Typography variant="h5" fontWeight={700}>
                ₹{sellingPrice}
              </Typography>

              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "#878787",
                }}
              >
                ₹{originalPrice}
              </Typography>

              <Chip label={`${discount}% OFF`} size="small" color="success" />
            </Stack>

            <Stack direction="row" spacing={1} mt={2} alignItems="center">
              <LocalShippingOutlinedIcon fontSize="small" color="success" />

              <Typography color="success.main" fontWeight={600}>
                Free Delivery by Tomorrow
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* PART 2 CONTINUES FROM HERE */}
            {/* ACTION BUTTONS */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Button
                color="error"
                variant="text"
                startIcon={<DeleteOutlinedIcon />}
                onClick={() => removeCartItem(cartDetails.productId)}
                sx={{
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: 15,
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: "#ffebee",
                  },
                }}
              >
                Remove
              </Button>

              <Button
                variant="outlined"
                startIcon={<FavoriteBorderIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Save for Later
              </Button>
            </Stack>
          </Box>

          {/* PRICE SECTION */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: 180,
              },
              borderLeft: {
                xs: "none",
                md: "1px solid #eeeeee",
              },
              pl: {
                xs: 0,
                md: 3,
              },
              pt: {
                xs: 3,
                md: 0,
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Quantity
              </Typography>

              <Typography variant="h6" fontWeight={600} mt={0.5}>
                {quantity}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={3}>
                Total
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: "#212121",
                  mt: 1,
                }}
              >
                ₹{totalPrice.toFixed(2)}
              </Typography>

              <Typography
                sx={{
                  color: "#388e3c",
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                You save ₹
                {((originalPrice - sellingPrice) * quantity).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CartItem;
