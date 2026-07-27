import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";

const AppLink = ({ to, children, sx = {}, ...props }) => {
  return (
    <Box
      component={NavLink}
      to={to}
      sx={{
        textDecoration: "none",
        color: "text.primary",
        fontSize: "14px",
        fontWeight: 500,
        transition: "0.2s ease",

        "&:hover": {
          color: "primary.main",
        },

        "&.active": {
          color: "primary.main",
          borderBottom: "2px solid",
          borderColor: "primary.main",
        },

        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AppLink;
