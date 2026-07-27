import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Navbar from "../../../components/Navbar";
import apiClient from "../../../services/apiClient";
import OrderCard from "../components/OrderCard";

const FILTERS = [
  "ALL",
  "PENDING_PAYMENT",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get("/api/orders/customer");
      console.log("Fetched Orders:", data); // Debugging line

      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "ALL" || order.orderStatus === statusFilter;

      const matchesSearch =
        order.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
        order.items?.some((item) =>
          item.productName?.toLowerCase().includes(search.toLowerCase()),
        );

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={45} />
      </Box>
    );

  if (error)
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#f5f7fa",
          minHeight: "100vh",
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          {/* Heading */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            spacing={2}
            mb={4}
          >
            <Typography variant="h4" fontWeight="bold">
              My Orders
            </Typography>

            <Chip color="primary" label={`${filteredOrders.length} Orders`} />
          </Stack>

          {/* Search */}

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by Order Number or Product Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>

          {/* Filters */}

          <Box
            sx={{
              overflowX: "auto",
              mb: 4,
              pb: 1,

              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                width: "max-content",
              }}
            >
              {FILTERS.map((status) => (
                <Chip
                  key={status}
                  clickable
                  label={status.replaceAll("_", " ")}
                  color={statusFilter === status ? "primary" : "default"}
                  variant={statusFilter === status ? "filled" : "outlined"}
                  onClick={() => setStatusFilter(status)}
                  sx={{
                    px: 1,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Orders */}

          {filteredOrders.length === 0 ? (
            <Paper
              sx={{
                p: 6,
                borderRadius: 3,
              }}
            >
              <Alert severity="info">No orders found.</Alert>
            </Paper>
          ) : (
            <Stack spacing={3}>
              {filteredOrders.map((order) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
};

export default OrdersPage;
