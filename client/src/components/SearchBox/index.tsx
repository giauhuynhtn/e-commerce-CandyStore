import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { fetchProductsByNameThunk } from "../../services/thunks.services";
import { AppDispatch } from "../../redux/store";

export default function SearchBox() {
  const dispatch = useDispatch<AppDispatch>();

  const [searchValue, setSearchValue] = useState("");
  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    dispatch(fetchProductsByNameThunk(searchValue));
  };

  return (
    <Box
      component='form'
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}>
      <TextField
        fullWidth
        id='outlined-basic'
        label='Search candy'
        variant='outlined'
        type='text'
        value={searchValue}
        onChange={handleChangeSearchValue}
        sx={{ ml: 1, flex: 1, lableColor: "#00897b" }}
        inputProps={{ "aria-label": "search candy" }}
      />
      <IconButton
        type='button'
        sx={{ p: "10px" }}
        aria-label='search'
        onClick={handleClick}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
