import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import {
  TrackChanges,
  Visibility,
  Favorite,
  LocalShipping,
  Security,
  Inventory2,
  SupportAgent,
} from "@mui/icons-material";

import Navbar from "../components/Navbar";

const values = [
  {
    title: "Our Mission",
    description:
      "To make online shopping simple, secure, and affordable for everyone.",
    icon: <TrackChanges />,
    color: "#1976d2",
  },
  {
    title: "Our Vision",
    description:
      "To become a trusted destination for quality products and excellent service.",
    icon: <Visibility />,
    color: "#16a34a",
  },
  {
    title: "Our Values",
    description:
      "Customer satisfaction, honesty, quality, innovation, and fair pricing.",
    icon: <Favorite />,
    color: "#e91e63",
  },
];

const benefits = [
  {
    title: "Fast Delivery",
    description: "Reliable delivery right to your doorstep.",
    icon: <LocalShipping />,
  },
  {
    title: "Secure Payments",
    description: "Your transactions and personal information matter to us.",
    icon: <Security />,
  },
  {
    title: "Quality Products",
    description: "Discover products across your favorite categories.",
    icon: <Inventory2 />,
  },
  {
    title: "Customer Support",
    description: "We're here to help when you need us.",
    icon: <SupportAgent />,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          background:
            "linear-gradient(120deg, #eaf3ff 0%, #f8fbff 55%, #fff4e8 100%)",
          py: { xs: 7, md: 11 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            color="primary"
            fontWeight={700}
            letterSpacing={2}
          >
            GET TO KNOW US
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{ fontSize: { xs: "2.5rem", md: "3.8rem" }, mt: 1 }}
          >
            Shopping made
            <Box component="span" color="primary.main">
              {" "}
              simple.
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 650, mt: 2, lineHeight: 1.8, fontWeight: 400 }}
          >
            We bring your favorite products together in one place, combining
            convenience, value, and a shopping experience you can trust.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Our Story
            </Typography>

            <Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 2 }}>
              We created our ecommerce platform with one goal: make it easier
              for people to discover and purchase the products they love.
            </Typography>

            <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
              From everyday essentials to products that inspire your lifestyle,
              we aim to deliver a convenient, reliable, and enjoyable shopping
              experience.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80"
              alt="Customer enjoying an online shopping experience"
              sx={{
                width: "100%",
                height: { xs: 260, md: 360 },
                objectFit: "cover",
                borderRadius: 4,
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 7, md: 10 }, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Our Mission, Vision & Values
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            The principles behind everything we do.
          </Typography>

          <Grid container spacing={3}>
            {values.map((value) => (
              <Grid item xs={12} md={4} key={value.title}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 4,
                    transition: "0.25s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: `${value.color}18`,
                        color: value.color,
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {value.icon}
                    </Avatar>

                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {value.title}
                    </Typography>

                    <Typography color="text.secondary" lineHeight={1.8}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: { xs: 7, md: 10 } }}>
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            gutterBottom
          >
            Why Shop With Us?
          </Typography>

          <Typography color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
            Everything you need for a better shopping experience.
          </Typography>

          <Grid container spacing={3}>
            {benefits.map((benefit) => (
              <Grid item xs={12} sm={6} md={3} key={benefit.title}>
                <Stack
                  alignItems="center"
                  textAlign="center"
                  spacing={1.5}
                  sx={{ p: 2 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 54,
                      height: 54,
                    }}
                  >
                    {benefit.icon}
                  </Avatar>

                  <Typography fontWeight={700}>{benefit.title}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
