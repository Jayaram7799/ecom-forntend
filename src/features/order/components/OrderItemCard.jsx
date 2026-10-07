import {
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const OrderItemCard = ({ item, orderStatus }) => {
  const formatPrice = (value) => {
    const amount = Number(value);

    if (Number.isNaN(amount)) {
      return "₹0.00";
    }

    return `₹${amount.toFixed(2)}`;
  };

  return (
    <Box
      sx={{
        p: 2.5,
        border: "1px solid #E5E7EB",
        borderRadius: 3,
        transition: "0.3s",

        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
          bgcolor: "#fcfcfc",
        },
      }}
    >
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
      >
        {/* =====================================================
            PRODUCT IMAGE
        ====================================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={
              item.imageUrl || "https://via.placeholder.com/150?text=Product"
            }
            alt={item.productName || "Product"}
            sx={{
              width: 120,
              height: 120,
              objectFit: "contain",
              bgcolor: "#f8f8f8",
              borderRadius: 2,
              p: 1,
            }}
          />
        </Box>

        {/* =====================================================
            PRODUCT DETAILS
        ====================================================== */}

        <Box flex={1}>
          <Typography variant="h6" fontWeight={700}>
            {item.productName}
          </Typography>

          <Chip
            size="small"
            icon={<ShoppingBagIcon />}
            label="Purchased"
            color="primary"
            sx={{
              mt: 1,
              mb: 2,
            }}
          />

          <Stack
            spacing={1}
            sx={{
              mb: 2,
            }}
          >
            {/* Quantity */}

            <Typography color="text.secondary">
              Quantity:
              <Typography component="span" fontWeight={600} ml={1}>
                {item.quantity}
              </Typography>
            </Typography>

            {/* Unit Price */}

            <Typography color="text.secondary">
              Unit Price:
              <Typography component="span" fontWeight={600} ml={1}>
                {formatPrice(item.price)}
              </Typography>
            </Typography>

            {/* Subtotal */}

            <Typography color="text.secondary">
              Subtotal:
              <Typography
                component="span"
                color="primary"
                fontWeight={700}
                ml={1}
              >
                {formatPrice(item.subtotal)}
              </Typography>
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* =====================================================
              DELIVERY STATUS
          ====================================================== */}

          {orderStatus === "DELIVERED" ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon color="success" />

              <Typography color="success.main" fontWeight={600}>
                Delivered Successfully
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalShippingIcon color="primary" />

              <Typography fontWeight={500}>Delivery in Progress</Typography>
            </Stack>
          )}

          {/* =====================================================
              RATE PRODUCT
          ====================================================== */}

          {orderStatus === "DELIVERED" && (
            <Button
              variant="outlined"
              startIcon={<StarIcon />}
              color="warning"
              sx={{
                mt: 2,
                borderRadius: 5,
              }}
            >
              Rate Product
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default OrderItemCard;
