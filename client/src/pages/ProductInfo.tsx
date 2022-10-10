import React, { useEffect, useState } from "react";
import { fetchProductInfoThunk } from "../services/thunks.services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { addCartItem } from "redux/slices/cartSlice";
import MenuBar from "components/MenuBar";

const ProductInfo = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => {
    return state;
  });
  const { productId } = useParams<{ productId: string }>();
  console.log("productId:", productId);

  useEffect(() => {
    dispatch(fetchProductInfoThunk({ id: productId }));
  }, [dispatch, productId]);

  const [quantity, setQuantity] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleAdd = () => {
    dispatch(
      addCartItem({
        product: products.productInfo,
        quantity: Number(quantity),
      })
    );
  };

  return (
    <>
      <MenuBar />
      <h1>Product Information</h1>
      <h3>{products.productInfo.name}</h3>
      <p>{products.productInfo.description}</p>
      <h3>{products.productInfo.price} Euro/pack</h3>
      <p>{products.productInfo.quantity} packs left</p>
      <img
        src={products.productInfo.img}
        alt={products.productInfo.name}
        style={{ width: "300px" }}
      />
      <input value={quantity} onChange={handleChange}></input>
      <button onClick={handleAdd}>ADD</button>
      <button onClick={() => navigate("/home")}>BACK</button>
    </>
  );
};

export default ProductInfo;
