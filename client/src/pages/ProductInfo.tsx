import React, { useEffect } from "react";
import { fetchProductInfoThunk } from "../services/thunks.services";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => {
    return state;
  });
  const { productId } = useParams<{ productId: string }>();
  console.log("productId:", productId);

  useEffect(() => {
    dispatch(fetchProductInfoThunk({ id: productId }));
  }, [dispatch, productId]);

  return (
    <>
      <h1>Product Information</h1>
      <h3>{products.productInfo.name}</h3>
      <p>{products.productInfo.description}</p>
      <h3>{products.productInfo.price} Euro/pack</h3>
      <p>{products.productInfo.quantity} packs left</p>
      <img
        src={products.productInfo.img}
        alt={products.productInfo.name}
        style={{ width: "100px" }}
      />
    </>
  );
};

export default ProductInfo;
