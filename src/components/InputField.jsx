import { TextField } from "@mui/material";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
}) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      variant="outlined"
    />
  );
};

export default InputField;
