import Header from "@components/Header/Header";
import { useState } from "preact/hooks";
import {} from "preact/hooks";

export function App() {
  const [activeTopMenuItem, setActiveTopMenuItem] = useState("Blank");

  const handleTopMenuItemClick = (menuItem: string) => {
    setActiveTopMenuItem(menuItem);
  };

  return (
    <>
      <div className="relative">
        <Header
          activeMenuItem={activeTopMenuItem}
          onTopMenuItemClick={handleTopMenuItemClick}
        />
      </div>
    </>
  );
}
