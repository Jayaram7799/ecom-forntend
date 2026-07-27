import { useState, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";

import SearchBar from "../../../components/SearchBar";
import { getCategories } from "../services/productService";

const Filters = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  //  FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  //  CATEGORY CHANGE
  const handleChange = (event) => {
    const value = event.target.value;
    setCategoryId(value);
    onCategoryChange?.(value);
  };

  return (
    <>
      {/*  CATEGORY */}
      <FormControl fullWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Category
        </Typography>

        <RadioGroup value={categoryId} onChange={handleChange}>
          <FormControlLabel value="" control={<Radio />} label="All" />

          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              value={String(category.id)}
              control={<Radio />}
              label={category.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Filters;
