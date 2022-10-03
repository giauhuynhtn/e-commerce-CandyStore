import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const Home = () => {
  const handleGoogleOnSuccess = (response: any) => {
    console.log("response:", response);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.myloview.com/posters/sweet-candy-background-vector-seamless-pattern-of-lollipop-caramel-chocolate-and-sugar-for-graphic-design-400-196935022.jpg)",
        height: "1200px",
      }}>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <a href='/shopping'>Go shopping</a>
    </div>
  );
};

export default Home;
