import React from "react";
import { TextField as AloiTextfield } from "../components/aloi/TextField";

const argTypes = {
  label: {
    name: "label",
    type: { name: "string", required: false },
    defaultValue: "Label",
    table: {
      type: {
        summary: "label"
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "text"
    }
  },
  value: {
    name: "value",
    type: { name: "string" },
    defaultValue: "",
    table: {
      type: {
        summary: "value"
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "text"
    }
  },
  fullWidth: {
    name: "fullWidth",
    type: { name: "boolean", required: false },
    defaultValue: false,
    table: {
      type: {
        summary: "value"
      },
      defaultValue: { summary: "Boolean" }
    },
    control: {
      type: "boolean"
    }
  },
  error: {
    name: "error",
    type: { name: "Error", required: false },
    defaultValue: false,
    table: {
      type: {
        summary: "value"
      },
      defaultValue: { summary: "Boolean" }
    },
    control: {
      type: "boolean"
    }
  },
  variant: {
    name: "variant",
    type: { name: "string", required: false },
    defaultValue: "outlined",
    table: {
      type: {
        summary: "label"
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "select",
      options: ["outlined", "filled", "standard"]
    }
  },
  color: {
    name: "color",
    type: { name: "string", required: false },
    defaultValue: "success",
    table: {
      type: {
        summary: "color",
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "select",
      options: ["success", "warning", "secondary"]
    }
  },
  helperText: {
    name: "helperText",
    type: { name: "string", required: false },
    table: {
      type: {
        summary: "color"
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "text"
    }
  },
  disabled: {
    name: "disabled",
    type: { name: "boolean", required: false },
    defaultValue: false,
    table: {
      type: {
        summary: "boolean"
      },
      defaultValue: { summary: "boolean" }
    },
    control: {
      type: "boolean",
      options: [true, false]
    }
  },
  onChange: {
    action: "handleChange"
  }
};

export default {
  title: "App/Components/Input",
  component: AloiTextfield
};

const Template = (args) => {
  const propsObject = {
    ...args
  };

  return (
    <>
      <AloiTextfield {...propsObject} />
    </>
  );
};

export const TextField = Template.bind({});

TextField.args = {
  label: "Sample Text Field",
  disabled: false,
  autoFocus: true,
  color: "primary",
  defaultValue: "sample text field value",
  error: false,
  fullWidth: false,
  margin: "none",
  maxRows: 0,
  minRows: 0,
  rows: 0,
  multiline: false,
  placeholder: "sample text field placeholder",
  required: false,
  size: "medium",
  variant: "outlined"
};
