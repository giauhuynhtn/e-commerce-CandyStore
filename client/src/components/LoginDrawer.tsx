import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { AppDispatch } from "../redux/store";
import { setCurrentUser, CurrentUser } from "../redux/slices/currentUserSlice";

export default function LoginDrawer() {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (isOpen: boolean) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(isOpen);
    };
  };
  const dispatch = useDispatch<AppDispatch>();

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode(token) as CurrentUser;
    dispatch(setCurrentUser(decoded));
    setToken(token);
  }, [dispatch, token]);

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
    console.log("token:", token);
    localStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ color: "white" }}>
        Login
      </Button>
      <Drawer anchor='top' open={state} onClose={toggleDrawer(false)}>
        <GoogleLogin
          onSuccess={handleGoogleOnSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Drawer>
    </div>
  );
}
