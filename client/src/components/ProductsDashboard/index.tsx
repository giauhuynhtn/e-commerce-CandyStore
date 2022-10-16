import React from "react";
import { useSelector } from "react-redux";
import { TableCell, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import axios from "axios";

import { RootState } from "../../redux/store";
import { Product } from "../../redux/slices/productsSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { fetchProductsThunk } from "services/thunks.services";

const baseURL = "http://localhost:4000/api/v1/products";

function ProductsDashboard() {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state: RootState) => {
    return state;
  });

  const handleEditProduct = (product: Product) => {
    navigate(`/admin/dashboard/product/${product._id}`);
  };

  const handleRemoveProduct = async (product: Product) => {
    await axios.delete(`${baseURL}/${product._id}`);
    const token = localStorage.getItem("candy-store-token") || "";

    dispatch(fetchProductsThunk(token));
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='countries table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Name
              </TableCell>
              <TableCell align='left' sx={{ fontSize: 16, color: "#212121" }}>
                Price
              </TableCell>
              <TableCell align='left' sx={{ fontSize: 16, color: "#212121" }}>
                Category
              </TableCell>
              <TableCell align='left' sx={{ fontSize: 16, color: "#212121" }}>
                Image
              </TableCell>
              <TableCell align='left' sx={{ fontSize: 16, color: "#212121" }}>
                Image link
              </TableCell>
              <TableCell align='left' sx={{ fontSize: 16, color: "#212121" }}>
                Quantity
              </TableCell>
              <TableCell
                align='left'
                sx={{ fontSize: 24, color: "#333" }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.items.map((product) => (
              <TableRow hover={true} key={product._id}>
                <TableCell align='center' sx={{ width: 100 }}>
                  <Typography sx={{ fontSize: 14 }}>{product.name}</Typography>
                </TableCell>
                <TableCell align='left' sx={{ width: 100 }}>
                  {product.price}
                </TableCell>
                <TableCell align='left' sx={{ width: 200 }}>
                  {product.category}
                </TableCell>
                <TableCell align='left' sx={{ width: 200 }}>
                  <img src={product.img} alt={product.name} width='60px' />
                </TableCell>

                <TableCell align='left' sx={{ width: 200 }}>
                  <a
                    href={product.img}
                    target='_blank'
                    rel='noopener noreferrer'>
                    Image link
                  </a>
                </TableCell>

                <TableCell align='left' sx={{ width: 100 }}>
                  {product.quantity}
                </TableCell>
                <TableCell align='left' sx={{ width: 100 }}>
                  <Button
                    onClick={() => handleEditProduct(product)}
                    variant='contained'>
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleRemoveProduct(product)}
                    variant='contained'>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProductsDashboard;
