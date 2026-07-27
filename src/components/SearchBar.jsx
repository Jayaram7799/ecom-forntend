import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Box, InputBase } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val); // 🔥 send to parent
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "25px",
        px: 2,
        py: 0.7,
        mb: 2,
        maxWidth: 250,
      }}
    >
      <InputBase
        placeholder="Search products..."
        fullWidth
        value={value}
        onChange={handleChange} // ✅ important
        sx={{
          fontSize: "14px",
        }}
      />

      <FaSearch
        style={{
          fontSize: "14px",
          color: "#777",
        }}
      />
    </Box>
  );
};

export default SearchBar;
