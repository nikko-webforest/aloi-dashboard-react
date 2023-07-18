import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, ListItem } from "@mui/material";

const NavItem = ({ href, icon: Icon, title, color, ...rest }) => {
  const location = useLocation();
  const active = href.includes(location.pathname) ? "active" : "";

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0
      }}
      {...rest}
      className={active}>
      <Button
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          fontSize: "15px",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
          width: "100%",
          ...(active && {
            color: "primary.main"
          }),
          "& svg": {
            mr: 1
          },
          "&:hover": {
            backgroundColor: "#fff",
            "& > .titleName": {
              color: "#669CFF !important",
              fontWeight: "bold"
            }
          }
        }}
        href={href}>
        <img alt="Logo" src={Icon} className="icon" />
        <span className="titleName" style={{ color: "#fff" }}>
          {title}
        </span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  color: PropTypes.string
};

export default NavItem;
