import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import MenuBar from "../components/MenuBar";
import SearchBox from "../components/SearchBox";
import FilterByCategory from "../components/FilterByCategory";
import { RootState } from "../redux/store";
import { fetchProductsThunk } from "../services/thunks.services";

// interface CredentialResponse {
//   /** This field is the returned ID token */
//   credential?: string;
//   /** This field sets how the credential is selected */
//   select_by?:
//     | "auto"
//     | "user"
//     | "user_1tap"
//     | "user_2tap"
//     | "btn"
//     | "btn_confirm"
//     | "brn_add_session"
//     | "btn_confirm_add_session";
//   clientId?: string;
// }

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = localStorage.getItem("token") || "";
  useEffect(() => {
    dispatch(fetchProductsThunk(token));
  }, [dispatch, token]);

  const { products } = useSelector((state: RootState) => {
    return state;
  });

  const renderList =
    products.filteredItems.length === 0
      ? products.items
      : products.filteredItems;

  return (
    <Container
      sx={{
        backgroundColor: "rgb(240, 219, 222)",
        maxWidth: "1400",
        margin: "0",
        padding: "0",
      }}>
      <MenuBar />

      <SearchBox />
      <FilterByCategory />

      <Paper sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {renderList.map((item) => (
            <Grid item xs={3} key={item._id}>
              <ProductCard product={item} key={item._id} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
