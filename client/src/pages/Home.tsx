import React, { useEffect } from "react";
import { fetchProductsThunk } from "redux/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => {
    return state;
  });
  console.log("products:", products);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>HOME</h1>
      <ul>
        {products.items.map((product, index) => (
          <li key={index}>
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
