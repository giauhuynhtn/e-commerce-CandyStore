import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { TableCell, TableHead, TableRow } from "@mui/material";

import MenuBar from "components/MenuBar";
import { removeCartItem } from "redux/slices/cartSlice";

function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartList } = useSelector((state: RootState) => {
    return state;
  });
  console.log("cartList:", cartList);

  return (
    <>
      <MenuBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='countries table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Number
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Image
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Name
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Price
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Quantity
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 16, color: "#212121" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartList.items.map((item, index) => (
              <TableRow hover={true} key={item.product._id}>
                <TableCell align='center' sx={{ width: 100 }}>
                  <Typography sx={{ fontSize: 14 }}>{index + 1}</Typography>
                </TableCell>

                <TableCell align='center' sx={{ width: 80 }}>
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    width='60px'
                  />
                </TableCell>

                <TableCell align='center' sx={{ width: 200 }}>
                  {item.product.name}
                </TableCell>

                <TableCell align='center' sx={{ width: 100 }}>
                  {item.product.price}
                </TableCell>

                <TableCell align='center' sx={{ width: 100 }}>
                  {item.quantity}
                </TableCell>
                <TableCell align='center' sx={{ width: 100 }}>
                  <Button
                    onClick={() => {
                      dispatch(removeCartItem(item));
                    }}
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

export default Checkout;
