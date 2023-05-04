import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { selectors } from "../../modules/Home";
import MainIndex from "./MainIndex";
import { experimentalStyled } from "@mui/material";
import Button from "@mui/material/Button";

const MainLayout = ({ children }) => {
  return <MainIndex> {children} </MainIndex>;
};

export default MainLayout;
