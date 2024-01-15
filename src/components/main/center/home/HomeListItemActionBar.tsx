import { ActionBarIconSvg } from "@/components/ui/icon/GoogleIcon";
import {
  ActionBarBookmark,
  ActionBarHeart,
  ActionBarMessage,
  ActionBarReTweet,
  ActionBarShare,
  ActionBarView,
} from "@/lib/Icon";
import { FC, Fragment } from "react";
const ActionsArray: ActionType[] = [
  "Message",
  "RePost",
  "Heart",
  "View",
  "BookMark",
  "Share",
];

type ActionType =
  | "Message"
  | "View"
  | "Heart"
  | "RePost"
  | "BookMark"
  | "Share";
const HomeListItemActionBar = ({ count }: { count: ActionCount }) => {
  const { Comments, Hearts, Reposts } = count;
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
    return (
      <div
        className={`${short ? "" : "grow"} ${
          type === "BookMark" && "mr-2"
        } flex relative`}
      >
        <div className="flex group">
          <div
            className={`w-[34.75px] h-[34.75px] absolute ring-0 top-0 bottom-0 left-0 transition-all duration-200 rounded-full -m-2 ${
              switchColor(type).hoverCircle
            }`}
          ></div>
          <div className={`flex ${switchColor(type).hoverIcon}`}>
            <ActionBarIconSvg
              width={5}
              height={5}
              path={icon}
              color="rgb(83,100,113)"
            />
            {count ? (
              <div
                className={`${
                  switchColor(type).hoverText
                } px-1 min-w-[calc(1em + 24px)] duration-200 transition-colors text-[13px] text-inputColor`}
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

  const IconContainer = (type: ActionType) => {
    switch (type) {
      case "Message":
        return (
          <Actions
            type="Message"
            icon={ActionBarMessage}
            count={count.Comments}
          />
        );

      case "RePost":
        return (
          <Actions
            type="RePost"
            icon={ActionBarReTweet}
            count={count.Reposts}
          />
        );

      case "Heart":
        return (
          <Actions type="Heart" icon={ActionBarHeart} count={count.Hearts} />
        );

      case "View":
        return (
          <Actions type="View" icon={ActionBarView} count={count.Comments} />
        );

      case "BookMark":
        return <Actions type="BookMark" icon={ActionBarBookmark} short />;

      case "Share":
        return <Actions type="Share" icon={ActionBarShare} short />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full flex gap-1 pt-3">
      {ActionsArray.map((e) => (
        <Fragment key={e}>{IconContainer(e)}</Fragment>
      ))}
    </div>
  );
};
export default HomeListItemActionBar;
