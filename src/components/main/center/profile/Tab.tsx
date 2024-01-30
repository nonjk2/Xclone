"use client";

import { usePathname, useRouter } from "next/navigation";

const TAB = [
  { tab: "Posts", link: "" },
  { tab: "Replies", link: "replies" },
  { tab: "Highlight", link: "highlights" },
  { tab: "Media", link: "media" },
  { tab: "Likes", link: "likes" },
];

const Tab = ({
  tab = "Posts",
}: {
  tab: "Posts" | "replies" | "highlights" | "media" | "likes";
}) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div className="home-header border-b border-gubunsun flex-row items-center h-full grow shrink outline-none block overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden flex-no-wrap h-full flex-col relative items-stretch flex snap-mandatory">
        <div className="flex justify-center items-center">
          {TAB.map((e) => (
            <div
              className="py-4 flex-grow items-center justify-center cursor-pointer flex-col h-[52px] hover:bg-lightblack"
              onClick={() => router.replace(`/${"profile"}/${e.link}`)}
              key={e.tab}
            >
              <div
                className={`flex items-center justify-center ${
                  // tab === "fol" ? "text-blackText font-bold" : "text-inputColor"
                  ""
                } text-[15px]`}
              >
                <span className="inherit-span ">Following</span>
                {/* {tab === "fol" && BottomSlide} */}
              </div>
            </div>
          ))}
          {/* homeheaderBottomLeft */}
          <div
            className="py-4 flex-grow items-center justify-center cursor-pointer flex-col h-[52px] hover:bg-lightblack"
            // onClick={() => setTab("fol")}
            key={"fol"}
          >
            <div
              className={`flex items-center justify-center ${
                // tab === "fol" ? "text-blackText font-bold" : "text-inputColor"
                ""
              } text-[15px]`}
            >
              <span className="inherit-span ">Following</span>
              {/* {tab === "fol" && BottomSlide} */}
            </div>
          </div>
          {/* setting */}
          <div className="w-[52px] h-[54px]"></div>
        </div>
      </div>
    </div>
  );
};
export default Tab;
