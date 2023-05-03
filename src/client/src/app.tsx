import LeftNavBar from "@components/Header/LeftNavBar";
import TopNavBar from "@components/Header/TopNavBar";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { useState } from "preact/hooks";
import {} from "preact/hooks";
import { Route, Router } from "preact-router";

export function App() {
  const [activeTopMenuItem, setActiveTopMenuItem] = useState("Blank");

  const handleTopMenuItemClick = (menuItem: string) => {
    setActiveTopMenuItem(menuItem);
  };

  return (
    <div className="relative">
      <TopNavBar onTopMenuItemClick={handleTopMenuItemClick} />
      <div className="absolute top-64px left-0">
        <LeftNavBar activeMenuItem={activeTopMenuItem} />
      </div>
      {/* <Router>
        <Route path="/page-layout" component={PageLayout} />
      </Router> */}
    </div>
  );
}
