import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import Layout from "../../../components/dashboard/Layout";
import { Box, Container, Grid, Pagination } from "@mui/material";
import SettingsPassword from "../components/SettingsPassword";
import SettingsNotifications from "../components/SettingsNotifications";

const Settings = (props) => {
  useEffect(() => {
    console.log("Settings page rendered..");
  });

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3
        }}>
        <Container maxWidth="lg">
          <SettingsNotifications />
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Settings;
