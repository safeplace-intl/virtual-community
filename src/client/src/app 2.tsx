import Header from "@components/header/Header";
import { useState } from "preact/hooks";
import {} from "preact/hooks";

export function App() {
  const [activeTopMenuItem, setActiveTopMenuItem] = useState("Blank");

  const handleTopMenuItemClick = (menuItem: string) => {
    setActiveTopMenuItem(menuItem);
  };

  return (
    <>
      <Header onTopMenuItemClick={handleTopMenuItemClick} />
    </>
  );
}
