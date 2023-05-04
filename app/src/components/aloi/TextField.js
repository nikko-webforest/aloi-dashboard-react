import React, { useContext } from "react";
import { Context as ThemeContext } from "ui";
import { TextField as MuiTextfield } from "@mui/material";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";

import { framework as theme } from "ui";


export const TextField = (props) => {
  const { theme } = useContext(ThemeContext);

  if (theme.name === "mui") {
    return <MuiTextfield {...props} />;
  }

  return <input type="text" {...props} />;
};

TextField.propTypes = {
  autoFocus: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(["none", "dense", "normal"]),
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(["medium", "small"]),
  value: PropTypes.string,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"])
};

export default TextField;
