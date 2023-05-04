import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import LoginIndex from "../components/LoginIndex";
import MainLayout from "../../../components/main/MainLayout";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import FacebookIcon from "../../icons/Facebook";
import GoogleIcon from "../../icons/Google";

const Login = (props) => {
  useEffect(() => {
    console.log("Login page rendered..");
  });

  return (
    <MainLayout>
      <LoginIndex />
    </MainLayout>
  );
};

export default Login;
