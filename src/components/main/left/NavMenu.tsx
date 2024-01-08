"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import MenuIcon from "./MenuIcon";
import { boldSvgArray, svgArray } from "@/lib/Icon";
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
    <header className="flex flex-col gap-[9px]">
      {svgArray.map((svg, idx) => (
        <MenuIcon
          path={svg}
          boldPath={boldSvgArray[idx]}
          key={svg}
          title={NavMenuTitle[idx]}
          pathname={NavMenuTitle[idx].toLowerCase()}
        />
      ))}
    </header>
  );
};
export default NavMenu;
