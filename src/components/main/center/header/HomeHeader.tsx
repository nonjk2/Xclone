import { HomeTabContext } from "@/context/HomeTabProvider";
import { useCallback, useContext } from "react";

const HomeHeader = () => {
  const { tab, setTab } = useContext(HomeTabContext);
  // const BooleanTabFollow = useCallback((tab: "fol" | "rec") => {
  //   return `${}`;
  // }, []);

  const BottomSlide = (
    <div className="w-[54px] rounded-full inline-flex bottom-0 absolute min-w-[56px] h-1 self-center bg-blue" />
  );

  return (
    <div className="sticky flex bg-opacity-80 bg-white backdrop-blur-md z-20 top-0 flex-col ">
      {/* <div className="home-header z-10 cursor-pointer h-[53px] px-4 items-center flex-row justify-center w-full">
        <div className="home-header h-full justify-center flex-grow flex-shrink items-start">
          <h2 className="bg-[rgba(0,0,0,0)] list-none inline max-w-full overflow-hidden text-ellipsis flex-nowrap py-[2px] break-words font-bold text-blackText text-xl">
            <span>Home</span>
          </h2>
        </div>
      </div> */}

      <div className="home-header border-b border-gubunsun flex-row items-center h-full grow shrink outline-none block overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden flex-no-wrap h-full flex-col relative items-stretch flex snap-mandatory">
          <div className="flex justify-center items-center">
            {/* homeheaderBottomLeft */}

            <div
              className="py-4 flex-grow items-center justify-center cursor-pointer flex-col h-[52px] hover:bg-lightblack"
              onClick={() => setTab("rec")}
              key={"rec"}
            >
              <div
                className={`flex justify-center ${
                  tab === "rec" ? "text-blackText font-bold" : "text-inputColor"
                } text-[15px]`}
              >
                <span className="inherit-span">For you</span>
                {tab === "rec" && BottomSlide}
              </div>
            </div>

            {/* homeheaderBottomLeft */}
            <div
              className="py-4 flex-grow items-center justify-center cursor-pointer flex-col h-[52px] hover:bg-lightblack"
              onClick={() => setTab("fol")}
              key={"fol"}
            >
              <div
                className={`flex items-center justify-center ${
                  tab === "fol" ? "text-blackText font-bold" : "text-inputColor"
                } text-[15px]`}
              >
                <span className="inherit-span ">Following</span>
                {tab === "fol" && BottomSlide}
              </div>
            </div>
            {/* setting */}
            <div className="w-[52px] h-[54px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeHeader;
