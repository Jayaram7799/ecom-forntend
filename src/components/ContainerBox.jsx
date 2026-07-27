import { Box } from "@mui/material";

const ContainerBox = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerBox;
