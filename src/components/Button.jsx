import { Button as MuiButton } from "@mui/material";

const Button = ({
  text,
  sx = {},
  className = "",
  variant = "contained",
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color="primary"
      fullWidth
      className={className}
      sx={{
        textTransform: "none",
        borderRadius: "10px",

        "&:hover": {
          // no hover bg
          boxShadow: "none",
        },

        ...sx,
      }}
      {...props}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
