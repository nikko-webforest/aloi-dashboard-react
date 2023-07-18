import { useCallback, useState } from "react";
// @ts-ignore
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
// @ts-ignore
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "./Logo";
import { useKeycloak } from "@react-keycloak/web";
import ModalAloi from "../../modules/utils/Modal";
// @ts-ignore
import jiveLogout from "../../modules/icons/custom/logout.svg";
import jiveNotif from "../../modules/icons/custom/notif.svg";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const { keycloak } = useKeycloak();
  const [data, setData] = useState({
    disabled: false,
    open: false,
    loading: false
  });

  const kcLogout = (params) => {
    setData({ ...data, open: true });
  };

  const onSubmit = useCallback(() => {
    keycloak.logout({
      redirectUri: `${window.location.protocol}//${window.location.host}/${keycloak.realm}/login`
    });
  }, [keycloak]);

  const onClose = () => {
    setData({ ...data, open: false });
  };

  return (
    <AppBar elevation={0} {...rest}>
      <ModalAloi
        agree="Log out"
        close="Cancel"
        loading={data.loading}
        type="question"
        message=""
        onClose={onClose}
        onSubmit={onSubmit}
        open={data.open}
        disableSubmit={data.disabled}
        title={`Are you sure you want to log out?`}
      />
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
            marginRight: "20px",
            height: "100%",
            borderBottomRightRadius: 15,
            display: "flex",
            alignItems: "start",
            marginTop: "20px",
            justifyContent: "start"
          }}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            height: "100%",
            marginTop: "20px",
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
              height: "74px",
              backgroundColor: "#669cff",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              borderRadius: 3
            }}>
            <Hidden lgDown>
              <img alt="notif" src={jiveNotif} className="icon" />
              <img alt="logout" src={jiveLogout} className="icon" onClick={kcLogout} />
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
