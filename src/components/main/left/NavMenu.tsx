"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import MenuIcon from "./MenuIcon";
import { PostBtnSvg, boldSvgArray, svgArray } from "@/lib/Icon";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon/GoogleIcon";
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
    <header className="flex flex-col items-start max-xl:w-full first:pt-[2px] max-xl:items-center gap-2 short:gap-0">
      {svgArray.map((svg, idx) => (
        <MenuIcon
          path={svg}
          boldPath={boldSvgArray[idx]}
          key={svg}
          title={NavMenuTitle[idx]}
          pathname={NavMenuTitle[idx].toLowerCase()}
        />
      ))}
      <div className="my-4 w-[233px] max-xl:hidden">
        <Button
          backgroundColor="blue"
          color="white"
          hoverColor="hoverBgblue"
          size="tweet1"
          title={<span>Post</span>}
          onClick={() => push("/compose/tweet", { scroll: false })}
        />
      </div>
      <div className="max-xl:inline-block my-4 w-[52px] h-[52px] hidden">
        <Button
          backgroundColor="blue"
          color="white"
          hoverColor="hoverBgblue"
          size="tweet3"
          title={
            <div className="w-full h-full flex items-center justify-center">
              <Icon
                color="white"
                iconStyle="w-6 h-6"
                width={6}
                height={6}
                path={PostBtnSvg}
              />
            </div>
          }
          onClick={() => push("/compose/tweet", { scroll: false })}
        />
      </div>
    </header>
  );
};
export default NavMenu;
