import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "75vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 650,
            color: "#fff",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{
              mb: 2,
              fontSize: {
                xs: "2.5rem",
                md: "4rem",
              },
            }}
          >
            Discover Your Style
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "#E0E0E0",
            }}
          >
            Premium Fashion • Electronics • Jewelry
          </Typography>

          <Typography
            sx={{
              mb: 4,
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#F5F5F5",
            }}
          >
            Discover thousands of premium products with secure payments,
            lightning-fast delivery, and unbeatable prices.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,.15)",
                },
              }}
              onClick={() => navigate("/products")}
            >
              Explore Products
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
