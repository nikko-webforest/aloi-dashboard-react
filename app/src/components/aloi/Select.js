import { useContext } from "react";
import { Context as ThemeContext } from "ui";
import { Select as MuiSelect, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";

export const Select = (props) => {
  const { theme } = useContext(ThemeContext);

  if (theme.name === "mui") {
    return (
      <>
        <FormControl fullWidth>
          <InputLabel>{props.label}</InputLabel>
          <MuiSelect {...props}>
            {props.object.map((k, i) => (
              <MenuItem value={k.value} key={i}>
                {k.key}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      </>
    );
  }

  return (
    <select name="select">
      {props.object.map((k, i) => (
        <option value={k.value} key={i}>
          {k.key}
        </option>
      ))}
    </select>
  );
};

export default Select;
