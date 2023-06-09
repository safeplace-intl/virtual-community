import { h } from "preact";

interface NavItem {
  title: string;
  onClick: string;
  icon?: h.JSX.Element;
  subpages: string[];
}

export const navItems: NavItem[] = [
  // ex: { title: "Blank", subpages: [], onClick: "" },
  {
    title: "Feed",
    subpages: ["Stories", "Mentors", "Friends", "Groups"],
    onClick: "Feed",
  },
  // ex: { title: "Reports", subpages: [], onClick: "" },
  // { title: "Profile", subpages: [], onClick: "" },
  // { title: "Settings", subpages: [], onClick: "" },
];
