import { Avatar, Box, Chip, Paper, Stack, Typography } from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import OrderStatusChip from "./OrderStatusChip";

const OrderHeader = ({ order }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 4,
        p: 3,
        mb: 3,
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={3}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
      >
        {/* LEFT */}

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: "primary.main",
            }}
          >
            <ShoppingBagIcon fontSize="large" />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Order #{order.orderNumber}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <CalendarMonthIcon color="action" fontSize="small" />

              <Typography color="text.secondary">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>

            <Chip
              label={`Payment : ${order.paymentStatus}`}
              color={order.paymentStatus === "SUCCESS" ? "success" : "warning"}
              size="small"
              sx={{
                mt: 2,
              }}
            />
          </Box>
        </Stack>

        {/* RIGHT */}

        <Stack
          spacing={2}
          alignItems={{
            xs: "flex-start",
            md: "flex-end",
          }}
        >
          <OrderStatusChip status={order.orderStatus} />

          <Stack direction="row" spacing={1} alignItems="center">
            <CurrencyRupeeIcon color="primary" />

            <Typography variant="h4" fontWeight={700} color="primary">
              {order.totalAmount}
            </Typography>
          </Stack>

          <Typography color="text.secondary" variant="body2">
            Grand Total
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default OrderHeader;
