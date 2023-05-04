import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import RegisterIndex from "../components/RegisterIndex";
import MainLayout from "../../../components/main/MainLayout";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";

const Register = (props) => {
  useEffect(() => {
    console.log("Register page rendered..");
  });

  return (
    <MainLayout>
      <RegisterIndex />
    </MainLayout>
  );
};

export default Register;
