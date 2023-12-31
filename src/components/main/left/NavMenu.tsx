"use client";

import { useSelectedLayoutSegment } from "next/navigation";
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
  return (
    <header className="flex flex-col gap-2 first:pt-[2px]">
      {svgArray.map((svg, idx) => (
        <MenuIcon
          path={svg}
          boldPath={boldSvgArray[idx]}
          key={svg}
          title={NavMenuTitle[idx]}
          pathname={NavMenuTitle[idx].toLowerCase()}
        />
      ))}
      <div className="my-4">
        <Button
          backgroundColor="blue"
          color="white"
          hoverColor="hoverBlue"
          size="tweet1"
          title={<span>Post</span>}
        />
      </div>
    </header>
  );
};
export default NavMenu;
