interface LeftNavBarProps {
  activeMenuItem: string;
}

export default function LeftNavBar({ activeMenuItem }: LeftNavBarProps) {
  const navItems = [
    { title: "Blank", subpages: [] },
    {
      title: "Feed",
      subpages: ["Stories", "Mentors", "Friends", "Groups", "Label 5"],
    },
    { title: "Reports", subpages: [] },
    { title: "Profile", subpages: [] },
    { title: "Settings", subpages: [] },
  ];

  const activeItem = navItems.find((item) => item.title === activeMenuItem);

  if (!activeItem) {
    // Handle the case where activeItem is undefined
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
}
