import Header from "@components/Header/Header";

const Layout = () => {
  const handleTopMenuItemClick = () => {
    // handle click logic
  };

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full px-2 lg:w-1/12">
          <Header
            activeMenuItem={"home"}
            onTopMenuItemClick={handleTopMenuItemClick}
          />
        </div>
        <div className="w-full px-2 lg:w-10/12">
          <div className="flex flex-wrap -mx-1 lg:-mx-2">
            <div className="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 1 */}</div>
            <div className="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 2 */}</div>
            <div className="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 3 */}</div>
            <div className="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 4 */}</div>
          </div>
        </div>
        <div className="w-full px-2 lg:w-1/12"></div>
      </div>
    </div>
  );
};

export default Layout;
