"use client";
import HoverIcons from "@/components/ui/Icons";
import Input from "@/components/ui/Input";
import { Icon } from "@/components/ui/icon/GoogleIcon";
import { prev, setting } from "@/lib/Icon";
import useInput from "@/lib/hooks/useInput";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Tab from "../profile/Tab";

const ExploreHeader = () => {
  const router = useRouter();
  const seg = useSelectedLayoutSegment();

  const [searchValue, onChangesearchDataHandler] = useInput({
    searchValue: "",
  });

  const [isIconVisible, setIsIconVisible] = useState(true);

  const handleFocus = () => {
    setIsIconVisible(false);
  };

  const handleBlur = () => {
    setIsIconVisible(true);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchValue["searchValue"]}`);
  };
  return (
    <div className="sticky top-0 w-full bg-white backdrop-blur-md flex flex-col items-center justify-between">
      <div className="flex w-full items-center px-4 h-[53px]">
        {!isIconVisible && (
          <div className="flex min-w-[56px] h-full items-center ">
            <HoverIcons className="hover:bg-lightblack cursor-pointer">
              <Icon height={5} path={prev} width={5} />
            </HoverIcons>
          </div>
        )}
        <Input
          InputProps={{
            placeholder: "Search Twitter",
            sizes: "large",
            value: searchValue["searchValue"],
            onChange: onChangesearchDataHandler,
            id: "searchValue",
            onFocus: handleFocus,
            onBlur: handleBlur,
          }}
          onInputSubmit={handleSubmit}
        />
        <div className="flex min-w-[56px] h-full items-center justify-end">
          <HoverIcons className="hover:bg-lightblack cursor-pointer">
            <Icon height={5} path={setting} width={5} />
          </HoverIcons>
        </div>
      </div>
      {seg === "search" && (
        <div className="flex w-full h-full">
          <Tab tab="search" />
        </div>
      )}
    </div>
  );
};
export default ExploreHeader;
