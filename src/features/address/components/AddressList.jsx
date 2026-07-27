import { useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import AddressCard from "./AddressCard";
import Button from "../../../components/Button";
import CartContext from "../../../context/CartContext";
import apiClient from "../../../services/apiClient";

const AddressList = ({ addresses = [] }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cartList } = useContext(CartContext);

  const navigate = useNavigate();

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleContinuePayment = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select delivery address", {
          autoClose: 2000,
        });
        return;
      }

      if (!cartList || cartList.length === 0) {
        return;
      }

      setLoading(true);

      const orderRequest = {
        addressId: selectedAddress,
        items: cartList.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      console.log("Creating Order...");

      const orderResponse = await apiClient.post("/api/orders", orderRequest);

      const orderId = orderResponse.data.orderId;

      console.log("Order Created :", orderId);

      let orderDetails = null;

      for (let attempt = 1; attempt <= 15; attempt++) {
        console.log(`Checking Order Status... Attempt ${attempt}`);

        const response = await apiClient.get(`/api/orders/${orderId}`);

        orderDetails = response.data.data;

        console.log(orderDetails);

        if (orderDetails?.razorpayOrderId) {
          console.log("Payment Initialized");
          break;
        }

        await sleep(1000);
      }

      if (!orderDetails?.razorpayOrderId) {
        toast.error("Payment initialization failed. Please try again.", {
          autoClose: 2000,
        });
        return;
      }

      navigate("/payment", {
        state: {
          orderId: orderDetails.orderId,
          razorpayOrderId: orderDetails.razorpayOrderId,
          amount: orderDetails.totalAmount,
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Unable to proceed to payment",
        {
          autoClose: 2000,
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Select Delivery Address
      </Typography>

      {addresses.length > 0 ? (
        addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selectedAddress === address.id}
            onSelect={handleSelectAddress}
          />
        ))
      ) : (
        <Typography>No addresses found</Typography>
      )}

      <Button
        text="Add New Address"
        variant="outlined"
        sx={{
          mt: 2,
          height: 45,
        }}
        onClick={() => navigate("/address/add")}
      />

      <Button
        text={loading ? "Processing..." : "Continue To Payment"}
        disabled={loading}
        sx={{
          mt: 2,
          height: 50,
          fontWeight: 600,
        }}
        onClick={handleContinuePayment}
      />
    </Box>
  );
};

export default AddressList;
