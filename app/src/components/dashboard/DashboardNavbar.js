import { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import InputIcon from "@mui/icons-material/Input";
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
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={kcLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
