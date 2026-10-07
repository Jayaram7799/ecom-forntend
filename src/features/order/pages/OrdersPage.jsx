import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
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
import RefreshIcon from "@mui/icons-material/Refresh";

import Navbar from "../../../components/Navbar";
import apiClient from "../../../services/apiClient";
import OrderCard from "../components/OrderCard";

/*
|--------------------------------------------------------------------------
| Order Status Filters
|--------------------------------------------------------------------------
|
| IMPORTANT:
| These values must match your backend OrderStatus enum values.
|
*/
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
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  /*
  |--------------------------------------------------------------------------
  | Fetch Orders
  |--------------------------------------------------------------------------
  */

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/api/orders/customer");

      console.log("Full Orders API Response:", response.data);

      const orderList = response.data?.data;

      /*
      |--------------------------------------------------------------------------
      | Validate API Response
      |--------------------------------------------------------------------------
      */

      if (!Array.isArray(orderList)) {
        console.error("Invalid orders response. Expected array:", orderList);

        setOrders([]);

        setError("Invalid orders response from server");

        return;
      }

      console.log("Fetched Orders:", orderList);

      setOrders(orderList);
    } catch (err) {
      console.error("Failed to fetch orders:", err);

      const errorMessage =
        err?.response?.data?.message || err?.message || "Unable to load orders";

      setError(errorMessage);

      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Initial API Call
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /*
  |--------------------------------------------------------------------------
  | Search + Status Filtering
  |--------------------------------------------------------------------------
  */

  const filteredOrders = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return orders.filter((order) => {
      /*
      |--------------------------------------------------------------------------
      | Status Filter
      |--------------------------------------------------------------------------
      */

      const matchesStatus =
        statusFilter === "ALL" || order?.orderStatus === statusFilter;

      /*
      |--------------------------------------------------------------------------
      | If Search Box Is Empty
      |--------------------------------------------------------------------------
      */

      if (!searchValue) {
        return matchesStatus;
      }

      /*
      |--------------------------------------------------------------------------
      | Search Order Number
      |--------------------------------------------------------------------------
      */

      const matchesOrderNumber =
        order?.orderNumber?.toLowerCase().includes(searchValue) ?? false;

      /*
      |--------------------------------------------------------------------------
      | Search Product Name
      |--------------------------------------------------------------------------
      */

      const matchesProduct =
        order?.items?.some((item) =>
          item?.productName?.toLowerCase().includes(searchValue),
        ) ?? false;

      /*
      |--------------------------------------------------------------------------
      | Final Search Result
      |--------------------------------------------------------------------------
      */

      const matchesSearch = matchesOrderNumber || matchesProduct;

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <>
        <Navbar />

        <Box
          sx={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress />

            <Typography variant="body1" color="text.secondary">
              Loading your orders...
            </Typography>
          </Stack>
        </Box>
      </>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error State
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <>
        <Navbar />

        <Box
          sx={{
            bgcolor: "#f5f7fa",
            minHeight: "calc(100vh - 64px)",
            py: 5,
          }}
        >
          <Container maxWidth="lg">
            <Paper
              elevation={1}
              sx={{
                p: 4,
                borderRadius: 3,
              }}
            >
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>

              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={fetchOrders}
              >
                Try Again
              </Button>
            </Paper>
          </Container>
        </Box>
      </>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Main UI
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#f5f7fa",
          minHeight: "calc(100vh - 64px)",
          py: {
            xs: 3,
            sm: 4,
            md: 5,
          },
        }}
      >
        <Container maxWidth="lg">
          {/* -------------------------------------------------------------- */}
          {/* Page Header                                                     */}
          {/* -------------------------------------------------------------- */}

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
            <Box>
              <Typography variant="h4" fontWeight={700}>
                My Orders
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                View and track all your orders
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                color="primary"
                label={`${filteredOrders.length} of ${orders.length} Orders`}
              />

              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={fetchOrders}
              >
                Refresh
              </Button>
            </Stack>
          </Stack>

          {/* -------------------------------------------------------------- */}
          {/* Search                                                          */}
          {/* -------------------------------------------------------------- */}

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
              size="medium"
              placeholder="Search by Order Number or Product Name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>

          {/* -------------------------------------------------------------- */}
          {/* Status Filters                                                  */}
          {/* -------------------------------------------------------------- */}

          <Box
            sx={{
              overflowX: "auto",
              mb: 4,
              pb: 1,

              "&::-webkit-scrollbar": {
                display: "none",
              },

              scrollbarWidth: "none",
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                width: "max-content",
              }}
            >
              {FILTERS.map((status) => {
                const isSelected = statusFilter === status;

                return (
                  <Chip
                    key={status}
                    clickable
                    label={status.replaceAll("_", " ")}
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                    onClick={() => setStatusFilter(status)}
                    sx={{
                      px: 1,
                      fontWeight: 600,
                    }}
                  />
                );
              })}
            </Stack>
          </Box>

          {/* -------------------------------------------------------------- */}
          {/* Results Information                                             */}
          {/* -------------------------------------------------------------- */}

          {orders.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Showing {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"}
            </Typography>
          )}

          {/* -------------------------------------------------------------- */}
          {/* Empty State                                                     */}
          {/* -------------------------------------------------------------- */}

          {filteredOrders.length === 0 ? (
            <Paper
              elevation={1}
              sx={{
                p: {
                  xs: 3,
                  sm: 6,
                },
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                No orders found
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {search || statusFilter !== "ALL"
                  ? "Try changing your search or filter."
                  : "You haven't placed any orders yet."}
              </Typography>

              {(search || statusFilter !== "ALL") && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("ALL");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Paper>
          ) : (
            /* ------------------------------------------------------------ */
            /* Order List                                                    */
            /* ------------------------------------------------------------ */

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
