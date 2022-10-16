import React from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import MenuBar from "components/MenuBar";
import { useParams } from "react-router-dom";
import ProductForm from "components/ProductForm";

function ProductUpdate() {
  const { products } = useSelector((state: RootState) => {
    return state;
  });

  console.log("products:", products);

  const { productId } = useParams<{ productId: string }>();

  const selectProduct = products.items.find(
    (product) => product._id === productId
  );
  console.log("selectProduct:", selectProduct);

  return (
    <>
      <MenuBar />
      {selectProduct !== undefined ? (
        <ProductForm selectedProduct={selectProduct} />
      ) : null}
    </>
  );
}

export default ProductUpdate;
