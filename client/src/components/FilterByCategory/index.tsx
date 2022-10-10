import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";

import { AppDispatch } from "../../redux/store";

import { fetchProductsByCategoryThunk } from "../../services/thunks.services";

const categories = [
  "gummy",
  "candy stick",
  "candy cane",
  "fruit candy",
  "jelly beans",
];
export default function FilterByCategory() {
  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const handleFilterByCategory = () => {
    dispatch(fetchProductsByCategoryThunk(value));
  };

  return (
    <Box
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        minWidth: 400,
      }}>
      <FormControl sx={{ minWidth: 348 }}>
        <InputLabel id='filter-by-category' sx={{ color: "#00897b" }}>
          Category
        </InputLabel>
        <Select
          labelId='filter-by-category'
          id='category-select'
          value={value}
          label='Category'
          onChange={handleChange}>
          {categories.map((category, index) => (
            <MenuItem value={category} key={index}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        type='button'
        sx={{ p: "10px" }}
        aria-label='search'
        onClick={handleFilterByCategory}>
        <FilterAltIcon />
      </IconButton>
    </Box>
  );
}
