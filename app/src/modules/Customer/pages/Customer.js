import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import CustomerListResults from "../components/CustomerListResults";
import CustomerListToolbar from "../components/CustomerListToolbar";
import Layout from "../../../components/dashboard/Layout";
import { Box, Container } from "@mui/material";
import customers from "../mocks/customers";

const Customer = (props) => {
  useEffect(() => {
    console.log("Customer page rendered..");
  });

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Customer;
