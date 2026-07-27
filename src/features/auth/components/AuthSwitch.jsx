import { Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AUTH_CONFIG = {
  login: {
    text: "Don't have an account?",
    actionText: "Sign Up",
    to: "/signup",
  },
  signup: {
    text: "Already have an account?",
    actionText: "Login",
    to: "/",
  },
};

const AuthSwitch = ({ variant = "login", mt = 2 }) => {
  const config = AUTH_CONFIG[variant];

  return (
    <Box sx={{ mt, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {config.text}{" "}
        <Typography
          component={RouterLink}
          to={config.to}
          variant="body2"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {config.actionText}
        </Typography>
      </Typography>
    </Box>
  );
};

export default AuthSwitch;
