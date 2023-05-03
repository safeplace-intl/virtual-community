const PageLayout = () => {
  return (
    <div class="mx-auto max-w-screen-lg">
      <div class="flex flex-wrap -mx-2">
        <div class="w-full px-2 lg:w-1/12"></div>
        <div class="w-full px-2 lg:w-10/12">
          <div class="flex flex-wrap -mx-1 lg:-mx-2">
            <div class="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 1 */}</div>
            <div class="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 2 */}</div>
            <div class="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 3 */}</div>
            <div class="w-full px-1 lg:px-2 lg:w-1/4">{/* Column 4 */}</div>
          </div>
        </div>
        <div class="w-full px-2 lg:w-1/12"></div>
      </div>
    </div>
  );
};

export default PageLayout;
