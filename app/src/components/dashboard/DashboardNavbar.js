import { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "./Logo";
import { useKeycloak } from "@react-keycloak/web";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const { keycloak } = useKeycloak();

  const kcLogout = useCallback(() => {
    keycloak.logout({
      redirectUri: `${window.location.protocol}//${window.location.host}/${keycloak.realm}/login`
    });
  }, [keycloak]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          backgroundColor: "#F4EDE9"
        }}>
        <Box
          sx={{
            backgroundColor: "#F4EDE9",
            padding: 1,
            width: 200,
            height: "100%",
            borderBottomRightRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            height: "90%",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            padding: 2,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          }}>
          <Box
            sx={{
              flexGrow: 1,
              height: "120%",
              backgroundColor: "#669cff",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              borderRadius: 3
            }}>
            <Hidden lgDown>
              <IconButton color="inherit">
                <Badge badgeContent={notifications.length} color="primary" variant="dot">
                  <NotificationsIcon sx={{ fill: "#E2A632" }} />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={kcLogout}>
                <LogoutIcon sx={{ fill: "#674ABE" }} />
              </IconButton>
            </Hidden>
            <Hidden lgUp>
              <IconButton color="inherit" onClick={onMobileNavOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
