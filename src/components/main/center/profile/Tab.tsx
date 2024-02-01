"use client";

import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

type Tabs = "Posts" | "replies" | "highlights" | "media" | "likes";

const TAB = [
  { tab: "Posts", link: "" },
  { tab: "Replies", link: "replies" },
  { tab: "Highlight", link: "highlights" },
  { tab: "Media", link: "media" },
  { tab: "Likes", link: "likes" },
];

const Tab = ({ tab = "Posts" }: { tab?: Tabs }) => {
  const router = useRouter();
  const pathname = usePathname().split("/")[2] ?? "";
  const BottomSlide = (
    <div className="rounded-full inline-flex bottom-0 absolute min-w-[56px] h-1 self-center bg-blue" />
  );

  return (
    <div className="home-header border-b border-gubunsun flex-row items-center h-full grow shrink outline-none block overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden flex-no-wrap h-full flex-col relative items-stretch flex snap-mandatory">
        <div className="flex justify-center items-center">
          {TAB.map((e) => (
            <div
              className="flex py-4 flex-grow items-center justify-center min-w-[56px] cursor-pointer flex-col h-[52px] hover:bg-lightblack"
              onClick={() => router.replace(`/${"profile"}/${e.link}`)}
              key={e.tab}
            >
              <div
                className={`flex items-center w-full h-full justify-center ${
                  e.link === pathname
                    ? "text-blackText font-bold"
                    : "text-inputColor"
                } text-[15px]`}
              >
                <span className="inherit-span ">{e.tab}</span>
                {e.link === pathname && BottomSlide}
              </div>
            </div>
          ))}
          {/* homeheaderBottomLeft */}
        </div>
      </div>
    </div>
  );
};
export default Tab;
