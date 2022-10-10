import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Face2Icon from "@mui/icons-material/Face2";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/joy/Divider";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/store";
import Cart from "./Cart";
import { RootState } from "redux/store";
import Can from "services/rbacAuth/Can";
import { setCurrentUser } from "redux/slices/usersSlice";
import { resetCart } from "redux/slices/cartSlice";

const MenuBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();
  const { users } = useSelector((state: RootState) => {
    return state;
  });

  const handleGoToDashboard = () => {
    navigate("/products/dashboard/");
  };

  const [anchorUserMenu, setAnchorUserMenu] =
    React.useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
    //reset currentUser state
    const noUser = {
      userId: "",
      firstname: "",
      permission: "",
      banStatus: "",
      isAdmin: "",
      orders: [],
      iat: 0,
      exp: 0,
    };
    dispatch(setCurrentUser(noUser));
    //close userMenu
    setAnchorUserMenu(null);
    //reset cartSlice
    dispatch(resetCart());
    //remove local storage token
    localStorage.setItem("candy-store-token", "");
    //go go frontpage
    navigate("/");
  };

  const isMenuOpen = Boolean(anchorUserMenu);

  const userMenuId = "user-menu";

  const userMenuList = ["Account", "Setting"];

  const renderUserMenu = (
    <Menu
      anchorEl={anchorUserMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={userMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleUserMenuClose}
      sx={{ top: 40, right: 0 }}>
      <Box sx={{ minWidth: 200, flexGrow: 1 }}>
        {userMenuList.map((userMenu) => (
          <MenuItem>
            <Container
              onClick={() => {
                navigate(`/user/${userMenu}`);
              }}
              sx={{
                flexGrow: 1,
                fontSize: 22,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}>
              <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                {userMenu}
              </Typography>
            </Container>
          </MenuItem>
        ))}
        <Can
          role={users.currentUser.isAdmin === "true" ? "admin" : "user"}
          perform='products:get'
          yes={() => (
            <MenuItem>
              <Container
                onClick={handleGoToDashboard}
                sx={{
                  flexGrow: 1,
                  fontSize: 22,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}>
                <Divider orientation='horizontal' />
                <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                  DASHBOARD
                </Typography>
              </Container>
            </MenuItem>
          )}
        />

        <MenuItem>
          <Container
            onClick={handleLogout}
            sx={{
              flexGrow: 1,
              fontSize: 22,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <Divider orientation='horizontal' />
            <Typography sx={{ fontSize: 14, marginRight: 2 }}>
              Log out
            </Typography>
          </Container>
        </MenuItem>
      </Box>
    </Menu>
  );

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' sx={{ backgroundColor: "#80cbc4" }}>
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#00897b",
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Button
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#00897b",
                textDecoration: "none",
              }}
              onClick={() => navigate("/home")}>
              CANDY
            </Button>
          </Box>

          {users.currentUser.firstname === "" ? (
            <IconButton
              size='large'
              aria-label='show user menu'
              color='inherit'
              onClick={() => navigate("/")}
              sx={{ paddingLeft: "14px" }}>
              <Typography sx={{ paddingLeft: "8px" }}>Login</Typography>
            </IconButton>
          ) : (
            <>
              <Typography sx={{ paddingLeft: "8px" }}>
                Hi,{" "}
                {users.currentUser.isAdmin === "true"
                  ? "admin"
                  : users.currentUser.firstname}
              </Typography>
              <IconButton
                size='large'
                aria-label='show user menu'
                color='inherit'
                onClick={handleUserMenuOpen}
                sx={{ paddingLeft: "14px" }}>
                <Face2Icon sx={{ color: "#00897b" }} />
              </IconButton>
            </>
          )}
          <Cart />
          {isMenuOpen && renderUserMenu}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
