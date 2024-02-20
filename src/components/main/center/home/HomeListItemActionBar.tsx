import {
  ActionBarBookmark,
  ActionBarHeart,
  ActionBarMessage,
  ActionBarReTweet,
  ActionBarShare,
  ActionBarView,
} from "@/lib/Icon";
import { Fragment } from "react";
import Actions from "./Actions";

const ActionsArray: PostActionType[] = [
  "Message",
  "RePost",
  "Heart",
  "View",
  "BookMark",
  "Share",
];
const PhotoActionsArray: PhotoActionType[] = [
  "Message",
  "RePost",
  "Heart",
  "View",
  "Share",
];

export type PostActionType =
  | "Message"
  | "View"
  | "Heart"
  | "RePost"
  | "BookMark"
  | "Share";

export type PhotoActionType = Exclude<PostActionType, "BookMark">;

const HomeListItemActionBar = ({
  count,
  type,
  photo = false,
}: {
  type: "post" | "photo";
  count: ActionCount;
  photo?: boolean;
}) => {
  const { Comments, Hearts, Reposts } = count;

  const IconContainer = (type: PostActionType | PhotoActionType) => {
    switch (type) {
      case "Message":
        return (
          <Actions
            type="Message"
            icon={ActionBarMessage}
            count={count.Comments}
            photo={photo}
          />
        );

      case "RePost":
        return (
          <Actions
            photo={photo}
            type="RePost"
            icon={ActionBarReTweet}
            count={Reposts}
          />
        );

      case "Heart":
        return (
          <Actions
            photo={photo}
            type="Heart"
            icon={ActionBarHeart}
            count={Hearts}
          />
        );

      case "View":
        return (
          <Actions
            type="View"
            photo={photo}
            icon={ActionBarView}
            count={Comments}
          />
        );

      case "BookMark":
        return (
          <Actions
            type="BookMark"
            photo={photo}
            icon={ActionBarBookmark}
            short
          />
        );

      case "Share":
        return (
          <Actions type="Share" photo={photo} icon={ActionBarShare} short />
        );

      default:
        return null;
    }
  };

  const SwitchActionBar = (type: "post" | "photo") => {
    switch (type) {
      case "post":
        return (
          <div className="w-full flex gap-1 pt-3">
            {ActionsArray.map((e) => (
              <Fragment key={e}>{IconContainer(e)}</Fragment>
            ))}
          </div>
        );
      case "photo":
        return (
          <div className="flex mx-auto my-0 w-[600px] px-7 items-center justify-center h-full">
            {PhotoActionsArray.map((e) => (
              <Fragment key={e}>{IconContainer(e)}</Fragment>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <article className="w-full h-full flex items-center justify-center">
      {SwitchActionBar(type)}
    </article>
  );
};
export default HomeListItemActionBar;
