import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductListToolbar from "../components/ProductListToolbar";
import Layout from "../../../components/dashboard/Layout";
import { Box, Container, Grid, Pagination } from "@mui/material";
import products from "../mocks/products";

const Products = (props) => {
  useEffect(() => {
    console.log("Product page rendered..");
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
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3
            }}>
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Products;
