import { Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import OrderHeader from "./OrderHeader";
import OrderItemsSection from "./OrderItemsSection";
import OrderSummaryCard from "./OrderSummaryCard";
import OrderActions from "./OrderActions";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/orders/${order.orderId}`);
  };

  const handleTrackOrder = () => {
    navigate(`/orders/${order.orderId}/track`);
  };

  const handlePayNow = () => {
    navigate("/payment", {
      state: {
        orderId: order.orderId,
        razorpayOrderId: order.razorpayOrderId,
        amount: order.totalAmount,
      },
    });
  };

  const handleCancelOrder = () => {
    console.log("Cancel Order", order.orderId);
  };

  const handleBuyAgain = () => {
    console.log("Buy Again", order.orderId);
  };

  const handleDownloadInvoice = () => {
    console.log("Download Invoice", order.orderId);
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 5,
        borderRadius: 5,
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        transition: "0.3s",

        "&:hover": {
          boxShadow: "0px 10px 30px rgba(0,0,0,.08)",
        },
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        {/* Header */}

        <OrderHeader order={order} />

        {/* Products */}

        <OrderItemsSection order={order} />

        {/* Bottom */}

        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <OrderSummaryCard order={order} />
          </Grid>

          <Grid item xs={12} lg={5}>
            <OrderActions
              order={order}
              onViewDetails={handleViewDetails}
              onTrackOrder={handleTrackOrder}
              onPayNow={handlePayNow}
              onCancelOrder={handleCancelOrder}
              onBuyAgain={handleBuyAgain}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
