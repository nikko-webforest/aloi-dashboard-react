import { useContext } from "react";
import { Context as ThemeContext } from "ui";
import { Button as MuiButton } from "@mui/material";
import { PropTypes } from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";

export const Button = (props) => {
  const { theme } = useContext(ThemeContext);

  if (theme.name === "mui") {
    return <MuiButton {...props}>{props.children}</MuiButton>;
  }

  return <button {...props}>{props.children}</button>;
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  color: PropTypes.oneOf(["success", "error", "secondary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool
};

export default Button;
