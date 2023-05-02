import logo from "@assets/spi-logo.png";
import { h } from "preact";
import { useState } from "preact/hooks";

interface TopNavBarProps {
  onTopMenuItemClick: (menuItem: string) => void;
}

interface MenuItem {
  name: string;
  onClick: string;
  icon?: h.JSX.Element;
}

export default function TopNavBar({ onTopMenuItemClick }: TopNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems: MenuItem[] = [
    {
      name: "Feed",
      onClick: "Feed",
      // icon: <MdInbox size={24} aria-hidden="true" focusable="false" />,
    },
    {
      name: "Reports",
      onClick: "Reports",
      // icon: <MdPieChart size={24} aria-hidden="true" focusable="false" />,
    },
    {
      name: "Profile",
      onClick: "Profile",
      // icon: <MdPerson size={24} aria-hidden="true" focusable="false" />,
    },
    {
      name: "Settings",
      onClick: "Settings",
      // icon: <MdSettings size={24} aria-hidden="true" focusable="false" />,
    },
  ];

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
          <div className="relative">
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
          </div>
        </form>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center text-black-100 py-2 gap-4">
        {menuItems.map((item) => (
          <a
            key={item.name}
            onClick={() => onTopMenuItemClick(item.onClick)}
            href="#"
            className="text-base font-normal leading-6 tracking-normal py-2 px-4 hover:underline hover:text-spi-violet-100"
          >
            {item.name}
          </a>
        ))}
        <button className="text-base font-bold leading-6 tracking-normal bg-modal-100 text-spi-violet-100 py-2 px-4 border rounded-lg border-spi-violet-100 mr-2">
          Log In
        </button>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden flex relative">
        <button onClick={toggleMenu} className="focus:outline-none">
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
          <div className="absolute right-0 bg-white shadow rounded mt-10 w-48">
            {menuItems.map((item) => (
              <a
                key={item.name}
                onClick={() => onTopMenuItemClick(item.onClick)}
                href="#"
                className="block px-4 py-2 font-bold hover:underline hover:text-spi-violet-100"
              >
                {item.name}
              </a>
            ))}
            <button className="font-bold w-full text-left bg-modal-100 text-spi-violet-100 py-2 px-4 border rounded-lg border-spi-violet-100">
              Log In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
