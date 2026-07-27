import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import CartContext from "../../../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();

  const { cartList, selectedCartItems } = useContext(CartContext);

  // Selected products
  const selectedItems = cartList.filter((item) =>
    selectedCartItems.includes(item.productId),
  );

  // Total quantity
  const totalItems = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Selling price
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Original price
  // Replace this with item.originalPrice if your backend provides it
  const actualPrice = selectedItems.reduce((total, item) => {
    const originalPrice = item.originalPrice || item.price;
    return total + originalPrice * item.quantity;
  }, 0);

  // Discount
  const discount = actualPrice - totalPrice;

  // Delivery Charge
  const deliveryCharge = totalItems === 0 ? 0 : totalPrice >= 999 ? 0 : 40;

  // Final Amount
  const finalAmount = totalPrice + deliveryCharge;

  const handleProceedToBuy = () => {
    navigate("/address", {
      state: {
        selectedItems,
      },
    });
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header */}

        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "#fafafa",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography fontWeight={700} color="text.secondary">
            PRICE DETAILS
          </Typography>
        </Box>

        {/* Body */}

        <Stack spacing={2} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary">
              Price ({totalItems} {totalItems === 1 ? "Item" : "Items"})
            </Typography>

            <Typography fontWeight={600}>₹{actualPrice.toFixed(2)}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary">Discount</Typography>

            <Typography fontWeight={600} color="success.main">
              - ₹{discount.toFixed(2)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary">Delivery Charges</Typography>

            <Typography
              fontWeight={600}
              color={deliveryCharge === 0 ? "success.main" : "text.primary"}
            >
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
            </Typography>
          </Box>

          <Divider />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" fontWeight={700}>
              Total Amount
            </Typography>

            <Typography variant="h6" fontWeight={700}>
              ₹{finalAmount.toFixed(2)}
            </Typography>
          </Box>

          <Divider />

          {discount > 0 && (
            <Typography color="success.main" fontWeight={600}>
              🎉 You will save ₹{discount.toFixed(2)} on this order
            </Typography>
          )}

          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={selectedItems.length === 0}
            onClick={handleProceedToBuy}
            sx={{
              mt: 2,
              py: 1.6,
              bgcolor: "#FB641B",
              borderRadius: 1.5,
              fontWeight: 700,
              fontSize: 15,
              textTransform: "uppercase",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#F4511E",
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                bgcolor: "#cfcfcf",
                color: "#777",
              },
            }}
          >
            {selectedItems.length === 0
              ? "SELECT ITEMS TO BUY"
              : "PROCEED TO BUY"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
