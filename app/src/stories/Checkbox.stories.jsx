import React from "react";
import { MuiThemeProvider, theme, useStyles } from "ui";
import { Checkbox as AloiCheckbox } from "../components/aloi/Checkbox";

const argTypes = {
  number: {
    defaultValue: 4,
    control: {
      type: "number"
    }
  },
  size: {
    name: "size",
    type: { name: "string", required: false },
    defaultValue: "small",
    table: {
      type: {
        summary: "size"
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "select",
      options: ["large", "small"]
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
  checked: {
    name: "checked",
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
  }
};

export default {
  title: "App/Components/Input",
  component: AloiCheckbox
};

const Template = (args) => {
  const number = args.number;

  return (
    <>
      {[...Array(number).keys()].map((n, key) => (
        <AloiCheckbox {...args} key={key} />
      ))}
    </>
  );
};

export const Checkbox = Template.bind({});

Checkbox.args = {
  label: "",
  number: 1,
  disabled: false,
  checked: false
};
