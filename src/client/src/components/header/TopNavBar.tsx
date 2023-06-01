import { useState } from "preact/hooks";

import logo from "../../assets/spi-logo.png";
import { navItems } from "../../menuitems";

interface TopNavBarProps {
  onTopMenuItemClick: (navItem: string) => void;
}

export default function Header({ onTopMenuItemClick }: TopNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState("");
  // const [isLeftNavVisible, setIsLeftNavVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveSubmenu("");
  };

  const handleSubmenuClick = (navItem: string) => {
    setActiveSubmenu(activeSubmenu === navItem ? "" : navItem);
  };

  const handleTopMenuItemClick = (navItem: string) => {
    onTopMenuItemClick(navItem);
    // setIsLeftNavVisible(true); // Show the left nav bar again when a top nav bar menu item is clicked on again
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between py-0 px-100 md:px-10 h-64px w-1440px bg-modal-100 border border-black-100 shadow box-shadow-[0_4px_4px_0px]-black-100">
      <div className="flex items-center">
        <a href="#">
          <img src={logo} alt="SPI Logo" className="h-8 mr-4"></img>
        </a>
        <form>
          <label htmlFor="default-search" className="sr-only">
            Search
          </label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 text-4xl font-bold leading-56 tracking-wide"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="py-3 block w-full pl-10 text-gray-900 border rounded focus:ring focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
            required
          ></input>
        </form>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center text-black-100 py-2 gap-4">
        {navItems.map((item) => (
          <a
            key={item.title}
            onClick={() => handleTopMenuItemClick(item.onClick)}
            href="#"
            className="text-base font-normal leading-6 tracking-normal py-2 px-4 hover:underline hover:text-spi-violet-100"
          >
            {item.title}
          </a>
        ))}
        <button className="text-base font-bold leading-6 tracking-normal bg-modal-100 text-spi-violet-100 py-2 px-4 border rounded-lg border-spi-violet-100 mr-2">
          Log In
        </button>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden flex relative">
        <button onClick={toggleMenu} className="focus:outline-none px-4">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isOpen && (
          <div className="fixed top-0 right-0 h-screen w-1/2 bg-white shadow-lg rounded-l-lg">
            <div className="flex justify-between items-center p-4">
              <button onClick={toggleMenu} className="focus:outline-none">
                <svg
                  className="h-6 w-6 text-black-100"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="px-4">
              {navItems.map((item) => (
                <div key={item.title}>
                  <a
                    onClick={() => {
                      handleSubmenuClick(item.title);
                    }}
                    href="#"
                    className="block py-2 font-heading3 text-heading3 hover:underline hover:text-spi-violet-100 text-left"
                  >
                    {item.title}
                  </a>
                  {item.subpages && activeSubmenu === item.title && (
                    <ul>
                      {item.subpages.map((subItem) => (
                        <li key={subItem}>
                          <a
                            onClick={() => onTopMenuItemClick(subItem)}
                            href="#"
                            className="block py-2 pl-4 font-subHeading text-subHeading hover:underline hover:text-spi-violet-100 text-left"
                          >
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <button className="w-1/2 py-2 px-4 font-heading text-center bg-modal-100 text-spi-violet-100 border rounded-lg border-spi-violet-100 mt-4">
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
