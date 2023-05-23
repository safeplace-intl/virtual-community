import TopNavBar from "./TopNavBar";

interface HeaderProps {
  onTopMenuItemClick: (menuItem: string) => void;
}

const Header = ({ onTopMenuItemClick }: HeaderProps) => {
  return <TopNavBar onTopMenuItemClick={onTopMenuItemClick} />;
};

export default Header;
