import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        textAlign: "center",
        py: 3,
        mt: 5,
      }}
    >
      <Typography>© 2026 Ecommerce Store. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;
