import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  fetchProductsThunk,
  fetchProductsByNameThunk,
} from "../services/thunks.services";
import { useDispatch, useSelector } from "react-redux";

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
    <>
      <h1>Shopping page</h1>
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
      {/* <button onClick={handleGetProducts}>Fetch product</button> */}
      <ul>
        {renderList.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <h3>{product.price} Euro/pack</h3>
            <p>{product.quantity} packs left</p>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
