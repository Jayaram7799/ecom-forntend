import { Box, TextField, Button, Typography } from "@mui/material";

const Newsletter = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        p: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h5">Subscribe For Updates</Typography>

      <Box mt={3}>
        <TextField label="Email Address" sx={{ width: 300 }} />

        <Button variant="contained" sx={{ ml: 2, height: 56 }}>
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Newsletter;
