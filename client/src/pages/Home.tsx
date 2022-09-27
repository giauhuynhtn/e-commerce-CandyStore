import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

import {
  fetchProductsThunk,
  fetchProductsByNameThunk,
} from "../services/thunks.services";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";

const Home = () => {
  const handleGoogleOnSuccess = (response: any) => {
    console.log("response:", response);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => {
    return state;
  });

  const [searchValue, setSearchValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleClick = () => {
    dispatch(fetchProductsByNameThunk(searchValue));
  };

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const renderList =
    products.filteredItemsByName.length === 0
      ? products.items
      : products.filteredItemsByName;

  return (
    <>
      <h1>HOME</h1>
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
        onChange={handleChange}
      />
      <button onClick={handleClick}>Search</button>
      <ul>
        {renderList.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
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
