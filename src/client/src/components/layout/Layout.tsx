import Header from "@components/header/Header";

const Layout = () => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <Header />

      <div className="w-full px-2 lg:w-10/12">
        <div className="flex content-center -mx-1 lg:-mx-2">
          <div className="w-full px-1 lg:px-2 lg:w-1/4 bg-slate-300 h-screen">
            {/* Column 1 */} &nbsp;
          </div>
          <div className="w-full px-1 lg:px-2 lg:w-1/4 bg-red-200 h-screen">
            {/* Column 2 */}
          </div>
          <div className="w-full px-1 lg:px-2 lg:w-1/4 bg-red-200 h-screen">
            {/* Column 3 */}
          </div>
          <div className="w-full px-1 lg:px-2 lg:w-1/4 bg-slate-300 h-screen">
            {/* Column 4 */}
          </div>
        </div>
      </div>
      <div className="w-full px-2 lg:w-1/12"></div>
    </div>
  );
};

export default Layout;
