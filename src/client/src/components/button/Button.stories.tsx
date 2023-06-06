import { Button } from "@components/button";

export default {
  title: "Atomic/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "tertiary", "chipset"],
      control: {
        type: "select",
      },
      description:
        "Controls which css styles are used for the component instance",
      defaultValue: "primary",
    },
    isDisabled: {
      options: [true, false],
      control: { type: "select" },
      description: "Determines whether the instance is disabled or enabled",
      defaultValue: false,
    },
    children: {
      control: "text",
      description: "nested jsx or HTML for child component rendering",
      defaultValue: "Null",
    },
    onClick: {
      description: "function that is executed on button click",
      defaultValue: "Unknown",
    },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: <>Primary</>,
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: <> Secondary </>,
  },
};

export const Tertiary = {
  args: {
    variant: "tertiary",
    children: <> Tertiary</>,
  },
};

export const Chipset = {
  args: {
    variant: "chipset",
    children: "Chipset",
  },
};
