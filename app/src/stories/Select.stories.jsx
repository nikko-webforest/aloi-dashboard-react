import React from "react";
import { Select as AloiSelect } from "../components/aloi/Select";

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
  onClick: {
    action: "on change"
  }
};

export default {
  title: "App/Components/Input",
  component: AloiSelect,
  argTypes
};

const Template = (args) => {
  const object = [
    {
      key: "Label 1",
      value: "Label 1"
    },
    {
      key: "Label 2",
      value: "Label 2"
    }
  ];

  const propsObject = {
    ...args,
    object
  };

  return (
    <>
      <AloiSelect {...propsObject} />
    </>
  );
};

export const Select = Template.bind({});
