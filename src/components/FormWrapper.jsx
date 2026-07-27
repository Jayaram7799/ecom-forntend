import { Box, Paper, Typography } from "@mui/material";

const FormWrapper = ({ title, children }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: 380,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600 }}>
          {title}
        </Typography>

        {children}
      </Paper>
    </Box>
  );
};

export default FormWrapper;
