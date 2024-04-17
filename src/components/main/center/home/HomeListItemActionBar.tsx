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
const PhotoBoardActionsArray: PhotoBoardActionType[] = [
  "Message",
  "RePost",
  "Heart",
  "BookMark",
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
export type PhotoBoardActionType = Exclude<PostActionType, "View">;

const HomeListItemActionBar = ({
  type,
  photo = false,
  post,
}: {
  type: "post" | "photo" | "photoboard";
  photo?: boolean;
  post: Post;
}) => {
  const IconContainer = (type: PostActionType | PhotoActionType) => {
    switch (type) {
      case "Message":
        return (
          <Actions
            type="Message"
            icon={ActionBarMessage}
            photo={photo}
            post={post}
            count={post._count.Comments}
          />
        );

      case "RePost":
        return (
          <Actions
            photo={photo}
            type="RePost"
            icon={ActionBarReTweet}
            post={post}
            count={post._count.Reposts}
          />
        );

      case "Heart":
        return (
          <Actions
            photo={photo}
            type="Heart"
            icon={ActionBarHeart}
            post={post}
            count={post._count.Hearts}
          />
        );

      case "View":
        return (
          <Actions
            type="View"
            photo={photo}
            icon={ActionBarView}
            post={post}
            count={0}
          />
        );

      case "BookMark":
        return (
          <Actions
            type="BookMark"
            photo={photo}
            icon={ActionBarBookmark}
            short
            post={post}
            count={0}
          />
        );

      case "Share":
        return (
          <Actions
            type="Share"
            photo={photo}
            icon={ActionBarShare}
            short
            post={post}
            count={0}
          />
        );

      default:
        return null;
    }
  };

  const SwitchActionBar = (type: "post" | "photo" | "photoboard") => {
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
      case "photoboard":
        return (
          <div className="flex w-full items-center justify-center h-full">
            {PhotoBoardActionsArray.map((e) => (
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
