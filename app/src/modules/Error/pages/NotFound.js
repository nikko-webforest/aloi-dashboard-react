import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import NotFoundIndex from "../components/NotFoundIndex";
import MainLayout from "../../../components/main/MainLayout";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";

const NotFound = (props) => {
  useEffect(() => {
    console.log("NotFound page rendered..");
  });

  return (
    <MainLayout>
      <NotFoundIndex />
    </MainLayout>
  );
};

export default NotFound;
