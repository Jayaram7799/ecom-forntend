import { Chip } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";

const OrderStatusChip = ({ status }) => {
  switch (status) {
    case "PENDING":
      return <Chip icon={<PendingIcon />} label="Pending" color="warning" />;

    case "CONFIRMED":
      return <Chip icon={<CheckCircleIcon />} label="Confirmed" color="info" />;

    case "SHIPPED":
      return (
        <Chip icon={<LocalShippingIcon />} label="Shipped" color="primary" />
      );

    case "OUT_FOR_DELIVERY":
      return (
        <Chip
          icon={<LocalShippingIcon />}
          label="Out For Delivery"
          color="secondary"
        />
      );

    case "DELIVERED":
      return (
        <Chip icon={<CheckCircleIcon />} label="Delivered" color="success" />
      );

    case "CANCELLED":
      return <Chip icon={<CancelIcon />} label="Cancelled" color="error" />;

    default:
      return <Chip icon={<InventoryIcon />} label={status} />;
  }
};

export default OrderStatusChip;
