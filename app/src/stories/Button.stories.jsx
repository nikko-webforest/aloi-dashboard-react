import { Button } from "../components/aloi/Button";
import { action } from "@storybook/addon-actions";

export default {
  title: "App/Components/Input",
  component: Button,
  argTypes: {
    onClick: {
      action: "click"
    }
  }
};

const Template = ({ children, ...args }) => {
  return <Button {...args}>{children}</Button>;
};

export const BasicButton = Template.bind({});

BasicButton.args = {
  children: "Button",
  disabled: false
};
