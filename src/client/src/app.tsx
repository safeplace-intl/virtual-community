import LeftNavBar from "@components/Header/LeftNavBar";
import TopNavBar from "@components/Header/TopNavBar";
import { useState } from "preact/hooks";
import {} from "preact/hooks";

export function App() {
  const [activeTopMenuItem, setActiveTopMenuItem] = useState("Blank");

  const handleTopMenuItemClick = (menuItem) => {
    setActiveTopMenuItem(menuItem);
  };

  return (
    // <div className="bg-red-500 h-screen w-screen m-auto flex">
    //   <div className="w-fit h-fit text-white text-2xl m-auto pb-32">
    //     Clean App
    //   </div>
    // </div>
    <div className="relative">
      <TopNavBar onTopMenuItemClick={handleTopMenuItemClick} />
      <div className="absolute top-64px left-0">
        <LeftNavBar activeMenuItem={activeTopMenuItem} />
        {/* Main content goes here */}
      </div>
    </div>
  );
}
