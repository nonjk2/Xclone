"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import MenuIcon from "./MenuIcon";
import { boldSvgArray, svgArray } from "@/lib/Icon";
import Button from "@/components/ui/button";
const NavMenuTitle = [
  "",
  "Home",
  "Explore",
  "Notifications",
  "Messages",
  "Lists",
  "Bookmarks",
  "Communities",
  "Verified",
  "Profile",
  "More",
];
const NavMenu = () => {
  const { push } = useRouter();
  return (
    <header className="flex flex-col items-start first:pt-[2px]">
      {svgArray.map((svg, idx) => (
        <MenuIcon
          path={svg}
          boldPath={boldSvgArray[idx]}
          key={svg}
          title={NavMenuTitle[idx]}
          pathname={NavMenuTitle[idx].toLowerCase()}
        />
      ))}
      <div className="my-4 w-[275px]">
        <Button
          backgroundColor="blue"
          color="white"
          hoverColor="hoverBgblue"
          size="tweet1"
          title={<span>Post</span>}
          onClick={() => push("/compose/tweet")}
        />
      </div>
    </header>
  );
};
export default NavMenu;
