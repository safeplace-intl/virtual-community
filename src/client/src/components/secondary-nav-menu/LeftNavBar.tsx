import { useEffect, useState } from "preact/hooks";

import { navItems } from "../../routes/menuitems";

interface LeftNavBarProps {
  activeMenuItem: string;
}

const LeftNavBar: React.FC<LeftNavBarProps> = ({ activeMenuItem }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activeItem = navItems.find((item) => item.title === activeMenuItem);

  if (!activeItem || isSmallScreen) {
    // Hide the left nav bar on small screens
    return null;
  }

  return (
    <div className="h-8 ml-10 bg-white w-64 h-auto p-4">
      <ul>
        <li key={activeItem.title}>
          <button className="font-bold py-2 px-4 block w-full text-left text-black-100 font-bold bg-spi-violet-200">
            {activeItem.title}
          </button>
          {activeItem.subpages.length > 0 && (
            <ul className="pl-4 space-y-4">
              {activeItem.subpages.map((subpage) => (
                <li key={subpage}>
                  <a href="#">
                    <span className="text-gray-600">{subpage}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default LeftNavBar;
