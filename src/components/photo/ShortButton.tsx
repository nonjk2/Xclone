"use client";
import { Nextnext, Prevprev } from "@/lib/Icon";
import { Icon } from "../ui/icon/GoogleIcon";
import { MouseEventHandler, useCallback, useContext, useState } from "react";
import { StyleContext } from "@/context/StyleProvider";

const ShortButton = () => {
  const { photoBoard, setphotoBoard } = useContext(StyleContext);

  const onClickHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      const photoSection = document.getElementById("photo-section-2");
      const caroucelSection = document.getElementById("photo-section-1");
      if (photoSection && caroucelSection) {
        setphotoBoard(!photoBoard);
        if (photoBoard) {
          caroucelSection.style.width = "calc(100% - 350px)";
          photoSection.style.width = "350px";
          photoSection.style.display = "flex";
        } else {
          caroucelSection.style.width = "100%";
          photoSection.style.width = "0";
          photoSection.style.display = "none";
        }
      }
    },
    [photoBoard, setphotoBoard]
  );
  return (
    <div className="absolute flex justify-center items-center right-0 top-0 w-[60px] h-[60px]">
      <div className="relative">
        <div
          onClick={onClickHandler}
          className={`flex items-center justify-center z-20 hover:bg-ButtonOpacity cursor-pointer w-[34.75px] h-[34.75px] bg-ButtonIconOpacity transition-all duration-200 rounded-full`}
        >
          {photoBoard ? (
            <Icon
              color={"rgb(255, 255, 255)"}
              height={5}
              width={5}
              path={Prevprev}
            />
          ) : (
            <Icon
              color={"rgb(255, 255, 255)"}
              height={5}
              width={5}
              path={Nextnext}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ShortButton;
