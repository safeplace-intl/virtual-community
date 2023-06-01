import TopNavBar from "./TopNavBar";

interface HeaderProps {
  activeMenuItem: string;
  onTopMenuItemClick: (menuItem: string) => void;
}

const Header = ({ onTopMenuItemClick }: HeaderProps) => {
  return <TopNavBar onTopMenuItemClick={onTopMenuItemClick} />;
};

export default Header;
