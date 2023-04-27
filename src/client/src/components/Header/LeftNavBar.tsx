import { useState } from "preact/hooks";

export default function LeftNavBar({ activeMenuItem }) {
  const [activePage, setActivePage] = useState("Blank");

  const navItems = [
    { title: "Blank", subpages: [] },
    { title: "Feed", subpages: ["Stories", "Mentors"] },
    { title: "Reports", subpages: [] },
    { title: "Profile", subpages: [] },
    { title: "Settings", subpages: [] },
  ];

  const activeItem = navItems.find((item) => item.title === activeMenuItem);

  return (
    <div className="h-8 ml-10 bg-white w-64 h-auto p-4">
      <ul>
        <li key={activeItem.title}>
          <button className="font-bold py-2 px-4 block w-full text-left text-black-100 font-bold bg-spi-violet-200">
            {activeItem.title}
          </button>
          {activeItem.subpages.length > 0 && (
            <ul className="pl-4">
              {activeItem.subpages.map((subpage) => (
                <li key={subpage}>
                  <span className="text-gray-600">{subpage}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
