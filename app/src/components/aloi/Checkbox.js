import { useContext } from "react";
import { Context as ThemeContext } from "ui";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export const Checkbox = (props) => {
  const { theme } = useContext(ThemeContext);

  if (theme.name === "mui") {
    return <MuiCheckbox {...props} />;
  }

  return <input type="checkbox" />;
};

Checkbox.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"])
};

export default Checkbox;
