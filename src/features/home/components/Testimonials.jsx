import { Box, Typography, Paper } from "@mui/material";

const Testimonials = () => {
  return (
    <Box p={5}>
      <Typography variant="h4" align="center" mb={4}>
        What Customers Say
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Typography>⭐⭐⭐⭐⭐ Excellent shopping experience.</Typography>

        <Typography mt={2}>
          ⭐⭐⭐⭐⭐ Fast delivery and quality products.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Testimonials;
