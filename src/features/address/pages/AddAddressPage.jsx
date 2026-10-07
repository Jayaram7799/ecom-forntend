import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import AddressList from "../components/AddressList";
import { getMyAddresses } from "../services/addressService";
import Navbar from "../../../components/Navbar";

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedItems = location.state?.selectedItems || [];

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await getMyAddresses();

      setAddresses(response.data);

      console.log("Fetched Addresses:", response.data);
      console.log("Selected Checkout Items:", selectedItems);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate("/cart");
      return;
    }

    fetchAddresses();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Your Addresses
        </Typography>

        <AddressList addresses={addresses} selectedItems={selectedItems} />
      </Box>
    </>
  );
};

export default AddressPage;
