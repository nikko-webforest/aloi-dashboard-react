import React from "react";
import { ButtonGroup as AloiButtonGroup } from "../components/aloi/ButtonGroup";
import { Button } from "../components/aloi/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const argTypes = {
  number: {
    defaultValue: 4,
    control: {
      type: "number"
    }
  },
  variant: {
    name: "variant",
    type: { name: "string", required: false },
    defaultValue: "text",
    table: {
      type: {
        summary: "variant",
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "select",
      options: ["text", "contained", "outlined"]
    }
  },
  size: {
    name: "size",
    type: { name: "string", required: false },
    defaultValue: "sm",
    table: {
      type: {
        summary: "size"
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "select",
      options: ["lg", "sm"]
    }
  },
  orientation: {
    name: "orientation",
    type: { name: "string", required: false },
    defaultValue: false,
    table: {
      type: {
        summary: "orientation"
      },
      defaultValue: { summary: "Text" }
    },
    control: {
      type: "boolean",
      options: [true, false]
    }
  }
};

export default {
  title: "App/Components/Input",
  component: AloiButtonGroup,
  argTypes
};

const Template = (args) => {
  const number = args.number;
  return (
    <AloiButtonGroup {...args}>
      {[...Array(number).keys()].map((n, key) => (
        <Button key={key}>{`Button ${n+1}`}</Button>
      ))}
    </AloiButtonGroup>
  );
};

export const ButtonGroup = Template.bind({});
