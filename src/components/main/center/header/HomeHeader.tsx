const HomeHeader = () => {
  return (
    <div className="home-header">
      <div className="home-header z-10 cursor-pointer h-[53px] px-4 items-center flex-row justify-center w-full">
        <div className="home-header h-full justify-center flex-grow flex-shrink items-start">
          <h2 className="bg-[rgba(0,0,0,0)] list-none inline max-w-full overflow-hidden text-ellipsis flex-nowrap py-[2px] break-words font-bold text-blackText text-xl">
            <span>Home</span>
          </h2>
        </div>
      </div>
      <div className="home-header border border-gubunsun flex-row items-center basis-0 h-full grow shrink outline-none block overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden flex-no-wrap h-full flex-col relative items-stretch flex">
          {/*  */}
          <div className="flex justify-center items-center">
            <div className="home-header flex-grow items-center justify-center cursor-pointer flex-col h-12 hover:bg-lightblack">
              <div className="font-bold text-gubunsun">
                <span className="inherit-span">For you</span>
                <div className="rounded-full inline-flex bottom-0 absolute w-full min-w-[56px] h-1 self-center bg-blue" />
              </div>
            </div>
            <div className="home-header flex-grow items-center justify-center cursor-pointer flex-col h-12 hover:bg-lightblack">
              <div className="h-full py-4 font-medium text-inputColor">
                <span className="inherit-span">Following</span>
                {/* <div /> */}
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};
export default HomeHeader;
