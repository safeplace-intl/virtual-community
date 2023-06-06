import Layout from "@components/layout";

export default {
  title: "Composite/Layout",
  component: Layout,
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
