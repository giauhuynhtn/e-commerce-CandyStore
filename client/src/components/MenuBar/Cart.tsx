import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Divider from "@mui/joy/Divider";

import { AppDispatch, RootState } from "../../redux/store";
import {
  closeCart,
  openCart,
  removeCartItem,
} from "../../redux/slices/cartSlice";
import { Container } from "@mui/material";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartList } = useSelector((state: RootState) => {
    return state;
  });
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(
    null
  );

  const handleCartOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleMenuClose = () => {
    dispatch(closeCart());
    setAnchorElCart(null);
  };
  let navigate = useNavigate();

  const isMenuOpen = Boolean(anchorElCart);

  const menuId = "user-shopping-cart";

  const renderMenu = (
    <Menu
      anchorEl={anchorElCart}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ top: 40, right: 0 }}>
      <Box sx={{ minWidth: 300, flexGrow: 1 }}>
        {cartList.items.length > 0 ? (
          cartList.items.map((item) => {
            return (
              <MenuItem key={item.product._id}>
                <Container
                  onClick={() => {
                    navigate(`/product/${item.product._id}/`);
                  }}
                  sx={{
                    flexGrow: 1,
                    fontSize: 22,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                    {item.product.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    Qnt: {item.quantity}
                  </Typography>
                </Container>

                <IconButton
                  size='large'
                  color='inherit'
                  onClick={() => dispatch(removeCartItem(item))}>
                  <DeleteOutlineIcon spacing={40} sx={{ left: 0 }} />
                </IconButton>
              </MenuItem>
            );
          })
        ) : (
          <Typography>Empty cart</Typography>
        )}
        <Divider orientation='horizontal' />
        <MenuItem>Check out</MenuItem>
      </Box>
    </Menu>
  );

  return (
    <>
      <Box
        sx={{ display: { md: "flex" } }}
        onClick={() => dispatch(openCart())}>
        <IconButton
          size='large'
          aria-label='show cart items'
          color='inherit'
          onClick={handleCartOpen}>
          <Badge badgeContent={cartList.items.length} color='error'>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
      {cartList.isOpening && renderMenu}
    </>
  );
}

export default Cart;
