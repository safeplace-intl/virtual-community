import { h } from "preact";

interface NavItem {
  title: string;
  onClick: string;
  icon?: h.JSX.Element;
  subpages: string[];
}

export const navItems: NavItem[] = [
  { title: "Blank", subpages: [], onClick: "" },
  {
    title: "Feed",
    subpages: ["Stories", "Mentors", "Friends", "Groups", "Label 5"],
    onClick: "Feed",
  },
  { title: "Reports", subpages: [], onClick: "" },
  { title: "Profile", subpages: [], onClick: "" },
  { title: "Settings", subpages: [], onClick: "" },
];
