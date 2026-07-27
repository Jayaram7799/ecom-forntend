import { Typography } from "@mui/material";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
