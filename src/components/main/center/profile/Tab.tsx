"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";

// type ProfileTabs = "Posts" | "Replies" | "Highlight" | "Media" | "Likes";
// type SearchTabs = "Top" | "latest" | "People" | "Media" | " Lists";
type TABListType = {
  tab: string;
  link: string;
}[];
export const TAB = [
  { tab: "Posts", link: "" },
  { tab: "Replies", link: "replies" },
  { tab: "Highlight", link: "highlights" },
  { tab: "Media", link: "media" },
  { tab: "Likes", link: "likes" },
];

export const SearchTab = [
  { tab: "Top", link: "" },
  { tab: "latest", link: "live" },
  { tab: "People", link: "user" },
  { tab: "Media", link: "media" },
  { tab: "Lists", link: "list" },
];

const TabList = ({
  TAB,
  onClickHandler,
  tabs,
}: {
  tabs: "profile" | "search";
  TAB: TABListType;
  onClickHandler: (link: string) => void;
}) => {
  const pathname = usePathname().split("/")[2] ?? "";
  const searchParams = useSearchParams().get("f");

  const BottomSlide = (
    <div className="rounded-full inline-flex bottom-0 absolute min-w-[56px] h-1 self-center bg-blue" />
  );
  const switchStyle = (tab: "profile" | "search", link: string) => {
    switch (tab) {
      case "profile":
        return {
          text:
            link === pathname ? "text-blackText font-bold" : "text-inputColor",
          bottomslide: link === pathname && BottomSlide,
        };
      case "search":
        return {
          text:
            link === searchParams
              ? "text-blackText font-bold"
              : "text-inputColor",
          bottomslide: link === searchParams && BottomSlide,
        };

      default:
        return {
          text: {},
        };
    }
  };
  return TAB.map((e) => (
    <div
      className="flex py-4 flex-grow items-center justify-center min-w-[56px] cursor-pointer flex-col h-[52px] hover:bg-lightblack"
      onClick={() => onClickHandler(e.link)}
      key={e.tab}
    >
      <div
        className={`flex items-center w-full h-full justify-center ${
          switchStyle(tabs, e.link).text
        } text-[15px]`}
      >
        <span className="inherit-span ">{e.tab}</span>
        {switchStyle(tabs, e.link).bottomslide}
      </div>
    </div>
  ));
};

const Tab = ({ tab = "profile" }: { tab?: "profile" | "search" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickhandler = (link: string) => {
    if (tab === "profile") {
      return router.replace(`/${tab}/${link}`, { scroll: false });
    } else if (tab === "search") {
      let newSearchParams = new URLSearchParams(searchParams.toString());
      if (link === "") {
        newSearchParams.delete("f");
        return router.replace(`${tab}?${newSearchParams}`);
      }
      newSearchParams.set("f", link);
      router.replace(`${tab}?${newSearchParams.toString()}`);
    }
  };

  return (
    <div className="home-header border-b border-gubunsun flex-row items-center h-full grow shrink outline-none block overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden flex-no-wrap h-full flex-col relative items-stretch flex snap-mandatory">
        <div className="flex justify-center items-center">
          <TabList
            onClickHandler={onClickhandler}
            TAB={tab === "search" ? SearchTab : TAB}
            tabs={tab}
          />
          {/* homeheaderBottomLeft */}
        </div>
      </div>
    </div>
  );
};
export default Tab;
