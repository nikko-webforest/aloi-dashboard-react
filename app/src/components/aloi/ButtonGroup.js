import { useContext } from "react";
import { Context as ThemeContext } from "ui";
import { ButtonGroup as ButtonGroupMui } from "@mui/material";
import { PropTypes } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

export const ButtonGroup = (props) => {
  const { theme } = useContext(ThemeContext);

  // Remove unused property using destructuring assignment
  const { orientation, number, ...ButtonGroupProps } = props;

  if (theme.name === "mui") {
    return (
      <ButtonGroupMui {...ButtonGroupProps} orientation={props.orientation ? "vertical" : "horizontal"}>
        {props.children}
      </ButtonGroupMui>
    );
  }

  return <div {...ButtonGroupProps}>{props.children}</div>;
};

ButtonGroup.propTypes = {
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  size: PropTypes.oneOf(["sm", "lg"]),
  orientation: PropTypes.bool
};

export default ButtonGroup;
