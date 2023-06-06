import Header from "@components/header";

export default {
  title: "Composite/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    activeItemMenu: { control: "text" },
  },
};

export const Base = {
  args: {
    activeItemMenu: {},
  },
};
