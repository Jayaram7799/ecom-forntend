import { forwardRef } from "react";
import { TextField } from "@mui/material";

const InputField = forwardRef(
  (
    { label, name, type = "text", value, onChange, onBlur, autoComplete },
    ref,
  ) => {
    return (
      <TextField
        fullWidth
        margin="normal"
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputRef={ref}
        variant="outlined"
      />
    );
  },
);

export default InputField;
