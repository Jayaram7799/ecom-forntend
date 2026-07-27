import { Paper, Stack, Typography, Button } from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const OrderActions = ({
  order,
  onViewDetails,
  onTrackOrder,
  onPayNow,
  onCancelOrder,
  onBuyAgain,
  onDownloadInvoice,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={3}>
        Quick Actions
      </Typography>

      <Stack spacing={2}>
        {/* View Details */}

        <Button
          fullWidth
          variant="contained"
          startIcon={<VisibilityOutlinedIcon />}
          onClick={onViewDetails}
          sx={{
            py: 1.4,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View Details
        </Button>

        {/* Track Order */}

        {(order.orderStatus === "CONFIRMED" ||
          order.orderStatus === "SHIPPED" ||
          order.orderStatus === "OUT_FOR_DELIVERY") && (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LocalShippingOutlinedIcon />}
            onClick={onTrackOrder}
            sx={{
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Track Order
          </Button>
        )}

        {/* Pay */}

        {order.paymentStatus === "PENDING" && (
          <Button
            fullWidth
            variant="contained"
            color="warning"
            startIcon={<PaymentOutlinedIcon />}
            onClick={onPayNow}
            sx={{
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Pay Now
          </Button>
        )}

        {/* Cancel */}

        {(order.orderStatus === "PENDING" ||
          order.orderStatus === "CONFIRMED") && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<CancelOutlinedIcon />}
            onClick={onCancelOrder}
            sx={{
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Cancel Order
          </Button>
        )}

        {/* Buy Again */}

        {order.orderStatus === "DELIVERED" && (
          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<ReplayOutlinedIcon />}
            onClick={onBuyAgain}
            sx={{
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Buy Again
          </Button>
        )}

        {/* Invoice */}

        {(order.orderStatus === "DELIVERED" ||
          order.paymentStatus === "SUCCESS") && (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<DownloadOutlinedIcon />}
            onClick={onDownloadInvoice}
            sx={{
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Download Invoice
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default OrderActions;
