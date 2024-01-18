"use client";
import { ActionBarIconSvg } from "@/components/ui/icon/GoogleIcon";
import { ActionType } from "./HomeListItemActionBar";
import { MouseEvent, MouseEventHandler } from "react";

const Actions = ({
  count,
  type,
  icon,
  short = false,
}: {
  count?: number;
  type: ActionType;
  icon: string;
  short?: boolean;
}) => {
  const switchColor = (type: ActionType) => {
    switch (type) {
      case "RePost":
        return {
          hoverCircle: "group-hover:bg-hoverGreen",
          hoverText: "group-hover:text-green",
          hoverIcon: "group-hover:text-green",
        };
      case "Heart":
        return {
          hoverCircle: "group-hover:bg-hoverRed",
          hoverText: "group-hover:text-red",
          hoverIcon: "group-hover:text-red",
        };

      default:
        return {
          hoverCircle: "group-hover:bg-hoverLightBlue",
          hoverText: "group-hover:text-blue",
          hoverIcon: "group-hover:text-blue",
        };
    }
  };

  const onClickActionHandler = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("hi");
  };

  return (
    <div
      className={`${short ? "" : "grow"} ${
        type === "BookMark" && "mr-2"
      } flex relative`}
    >
      <div className="z-50 flex group" onClick={onClickActionHandler}>
        <div
          className={`w-[34.75px] h-[34.75px] absolute ring-0 top-0 bottom-0 left-0 transition-all duration-200 rounded-full -m-2 ${
            switchColor(type).hoverCircle
          }`}
        />
        <div className={`flex ${switchColor(type).hoverIcon}`}>
          <ActionBarIconSvg
            width={5}
            height={5}
            path={icon}
            color="rgb(83,100,113)"
          />
          {count ? (
            <div
              className={`text-inputColor ${
                switchColor(type).hoverText
              } px-1 min-w-[calc(1em + 24px)] duration-200 transition-colors text-[13px] `}
            >
              <span className="inherit-span">{count}</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actions;
