import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import OrderItemCard from "./OrderItemCard";
import OrderHeader from "./OrderHeader";

const OrderItemsSection = ({ order }) => {
  console.log("OrderItemsSection order:", order); // Debugging line
  const items = order.items || [];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        spacing={2}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Inventory2OutlinedIcon color="primary" />

          <Typography variant="h6" fontWeight={700}>
            Ordered Items
          </Typography>
        </Stack>

        <Chip
          label={`${items.length} ${items.length === 1 ? "Item" : "Items"}`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* ================= ITEMS ================= */}

      {items.length === 0 ? (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
          }}
        >
          <Inventory2OutlinedIcon
            sx={{
              fontSize: 70,
              color: "grey.400",
            }}
          />

          <Typography variant="h6" mt={2} color="text.secondary">
            No products found for this order
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            This order doesn't contain any items.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2.5}>
          {items.map((item) => (
            <OrderItemCard
              key={item.productId}
              item={item}
              orderStatus={order.orderStatus}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default OrderItemsSection;
