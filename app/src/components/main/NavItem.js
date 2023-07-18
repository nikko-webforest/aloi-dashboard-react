import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, ListItem } from "@mui/material";

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
  const location = useLocation();

  const active = href == location.pathname
    ? "active"
    : "";

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0
      }}
      {...rest}>
      <Button
        component={RouterLink}
        className={active}
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          fontSize: "15px",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",
          ...(active && {
            color: "primary.main"
          }),
          "& svg": {
            mr: 1
          }
        }}
        to={href}>
        <img alt="Logo" src={Icon} className="icon"/>
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
