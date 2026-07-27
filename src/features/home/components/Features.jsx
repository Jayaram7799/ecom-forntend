import { Box, Typography } from "@mui/material";
import ContainerBox from "../../../components/ContainerBox";
import { FaMoneyBillWave, FaClock, FaHeart } from "react-icons/fa";

const Features = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        textAlign: "center",
        gap: 4,
        py: 5,
      }}
    >
      <ContainerBox>
        <Box sx={{ flex: 1 }}>
          <FaMoneyBillWave size={24} />
          <Typography fontWeight="bold">Flexible Payment</Typography>
          <Typography variant="body2">
            Pay your way, with options that work for you.
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <FaClock size={24} />
          <Typography fontWeight="bold">24×7 Service Support</Typography>
          <Typography variant="body2">
            Friendly help is always available.
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <FaHeart size={24} />
          <Typography fontWeight="bold">Best Quality</Typography>
          <Typography variant="body2">
            Crafted with attention, built to last.
          </Typography>
        </Box>
      </ContainerBox>
    </Box>
  );
};

export default Features;
