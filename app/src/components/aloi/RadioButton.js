import { useContext } from "react";
import { Context as ThemeContext } from "ui";
import { Radio as MuiRadio } from "@mui/material";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";

export const RadioButton = (props) => {
  const { theme } = useContext(ThemeContext);

  if (theme.name === "mui") {
    return <MuiRadio {...props} />;
  }

  return <input type="radio" />;
};

RadioButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool
};

export default RadioButton;
