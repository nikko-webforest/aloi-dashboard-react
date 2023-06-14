import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Divider, Drawer, Hidden, List, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Inventory2 } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from "react-feather";
import NavItem from "./NavItem";
import { useKeycloak } from "@react-keycloak/web";

const items = [
  {
    href: "/app/connectors",
    icon: ListIcon,
    title: "Connectors"
  },
  {
    href: "/app/packages",
    icon: Inventory2,
    title: "Packages"
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const { keycloak, initialized } = useKeycloak();
  const [user, setUser] = useState({
    avatar: null,
    jobTitle: null,
    name: null
  });

  useEffect(() => {
    const initials = [...keycloak.tokenParsed.name.matchAll(/[A-Z]/g)].map((m) => m[0]).join("");

    setUser({
      avatar: initials,
      jobTitle: keycloak.tokenParsed.email,
      name: keycloak.tokenParsed.name
    });
  }, [initialized]);

  const location = useLocation();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      className="sidebar"
      // sx={{
      //   display: { xs: "none", lg: "flex" },
      //   flexDirection: "column",
      //   borderRadius: 3,
      //   width: 250,
      //   backgroundColor: "#674abe",
      //   position: "fixed",
      //   top: 80,
      //   bottom: 10,
      //   marginLeft: 2
      // }}
    >
      <Box className="avatar">
        <Avatar
          component={Link}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64
          }}
          href={`https://auth.aloi.io/auth/realms/${keycloak.realm}/account/`}>
          {user.avatar}
        </Avatar>
        <Typography color="textPrimary" variant="h5" className="name">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <List className="nav">
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Box sx={{ display: { lg: "none", xs: "block" } }}>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}>
          {content}
        </Drawer>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)"
            }
          }}>
          {content}
        </Drawer>
      </Box>
      {/* {content} */}
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
