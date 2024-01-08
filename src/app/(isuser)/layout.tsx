"use client";
import NavMenu from "@/components/main/left/NavMenu";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const seg = useSelectedLayoutSegment();
  return (
    <div className="flex flex-row w-full">
      <div className="flex basis-auto flex-col relative grow z-20 items-end">
        <div className="flex items-stretch z-0 w-[275px] relative">
          <div className="items-stretch flex fixed top-0 h-full">
            <div className="items-stretch flex relative h-full justify-between flex-col overflow-y-auto gap-2 w-[275px] px-2">
              <NavMenu />
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-border flex flex-auto flex-col grow shrink items-start">
        <div className="items-stretch flex flex-col relative flex-grow flex-shrink basis-auto w-[990px]">
          {seg === "messages" ? <>{children}</> : <>{children}</>}
        </div>
      </div>
    </div>
  );
};
export default Layout;
