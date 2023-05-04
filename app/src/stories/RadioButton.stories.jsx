import React from "react";
import { RadioButton as AloiRadioButton} from "../components/aloi/RadioButton";

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
      options: ["large", "medium", "small"]
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
  component: AloiRadioButton,
  argTypes
};

const Template = (args) => {
  const number = args.number;
  return (
    <>
      {[...Array(number).keys()].map((n, key) => (
        <AloiRadioButton {...args} key={key} />
      ))}
    </>
  );
};

export const RadioButton = Template.bind({});
