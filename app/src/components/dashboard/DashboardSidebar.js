import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Divider, Drawer, Hidden, List, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Inventory2 } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
// @ts-ignore
import jiveListIcon from "../../modules/icons/custom/listIcon.svg";
// @ts-ignore
import jivePackageIcon from "../../modules/icons/custom/packages.svg";
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
    icon: jiveListIcon,
    title: "Connectors",
    color: "#FF6583"
  },
  {
    href: "/app/packages",
    icon: jivePackageIcon,
    title: "Packages",
    color: "#DEA041"
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
      sx={{
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        borderRadius: 3,
        width: 200,
        backgroundColor: "#674abe",
        position: "fixed",
        top: 100,
        bottom: 10,
        marginLeft: 10
      }}>
      <Box className="avatar">
        <Avatar
          component={Link}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
            bgcolor: "#6C9CFC",
            paddingBottom: "5px"
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
      <Box sx={{ pl: 2 }}>
        <List className="nav">
          {items.map((item) => {
            return <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} color={item.color} />;
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return <>{content}</>;
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
