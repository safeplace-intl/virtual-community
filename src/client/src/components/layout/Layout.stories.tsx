import Layout from "@components/layout";

export default {
  title: "Atomic/Layout",
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
