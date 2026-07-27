import { Grid, Paper, Typography } from "@mui/material";

const items = [
  "Fast Delivery",
  "Secure Payments",
  "24/7 Support",
  "Easy Returns",
];

const WhyChooseUs = () => {
  return (
    <>
      <Typography variant="h4" textAlign="center" mb={3}>
        Why Choose Us
      </Typography>

      <Grid container spacing={3} p={4}>
        {items.map((item) => (
          <Grid item xs={12} md={3} key={item}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" align="center">
                {item}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default WhyChooseUs;
