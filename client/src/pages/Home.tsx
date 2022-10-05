import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import {
  fetchProductsThunk,
  fetchProductsByNameThunk,
} from "../services/thunks.services";
import ProductCard from "../components/ProductCard";
import { AppDispatch, RootState } from "../redux/store";

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

type DecodedUser = {
  userId: string;
  permission: string;
  banStatus: boolean;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

const Home = () => {
  // useState
  const [searchValue, setSearchValue] = React.useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<null | DecodedUser>(null);
  console.log("user:", user);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode(token) as DecodedUser;
    setUser(decoded);
    setToken(token);
  }, [token]);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProductsThunk(token));
  }, [dispatch, token]);

  const { products } = useSelector((state: RootState) => {
    return state;
  });

  // Google auth
  const handleGoogleOnSuccess = async (response: any) => {
    console.log("response:", response);

    const res = await axios.post(
      "http://localhost:4000/api/v1/login",
      {},
      {
        headers: {
          id_token: response.credential,
        },
      }
    );
    const token = res.data.token;
    localStorage.setItem("token", token);
    setToken(token);
  };

  // Handle functions
  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    dispatch(fetchProductsByNameThunk(searchValue));
  };

  const renderList =
    products.filteredItemsByName.length === 0
      ? products.items
      : products.filteredItemsByName;

  return (
    <Container
      sx={{
        backgroundColor: "pink",
        maxWidth: "1400",
        margin: "0",
        padding: "0",
      }}>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <input
        type='text'
        value={searchValue}
        placeholder='search your candy ...'
        onChange={handleChangeSearchValue}
      />
      <button onClick={handleClick}>Search</button>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {renderList.map((item) => (
            <Grid item xs={3}>
              <ProductCard product={item} key={item._id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
