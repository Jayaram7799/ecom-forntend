import { Box, Divider, Paper, Stack, Typography, Chip } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const OrderSummaryCard = ({ order }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 4,
        p: 3,
        height: "100%",
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={3}>
        Order Summary
      </Typography>

      <Stack spacing={2.5}>
        {/* Payment Status */}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="text.secondary">Payment Status</Typography>

          <Chip
            icon={
              order.paymentStatus === "SUCCESS" ? (
                <CheckCircleIcon />
              ) : (
                <PendingIcon />
              )
            }
            label={order.paymentStatus}
            color={order.paymentStatus === "SUCCESS" ? "success" : "warning"}
          />
        </Box>

        <Divider />

        {/* Order Status */}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="text.secondary">Order Status</Typography>

          <Chip label={order.orderStatus} color="primary" />
        </Box>

        <Divider />

        {/* Quantity */}

        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">Total Quantity</Typography>

          <Typography fontWeight={600}>{order.totalQuantity}</Typography>
        </Box>

        <Divider />

        {/* Total */}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <ShoppingCartCheckoutIcon color="primary" />

            <Typography variant="h6" fontWeight={700}>
              Grand Total
            </Typography>
          </Stack>

          <Typography variant="h4" color="primary" fontWeight={700}>
            ₹{order.totalAmount}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default OrderSummaryCard;
