import LeftNavBar from "./LeftNavBar";
import TopNavBar from "./TopNavBar";

interface HeaderProps {
  activeMenuItem: string;
  onTopMenuItemClick: (menuItem: string) => void;
}

const Header = ({ activeMenuItem, onTopMenuItemClick }: HeaderProps) => {
  return (
    <div className="relative">
      <TopNavBar onTopMenuItemClick={onTopMenuItemClick} />
      <div className="absolute top-64px left-0">
        <LeftNavBar activeMenuItem={activeMenuItem} />
      </div>
    </div>
  );
};

export default Header;
