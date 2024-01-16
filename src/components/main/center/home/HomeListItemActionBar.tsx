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

const ActionsArray: ActionType[] = [
  "Message",
  "RePost",
  "Heart",
  "View",
  "BookMark",
  "Share",
];

export type ActionType =
  | "Message"
  | "View"
  | "Heart"
  | "RePost"
  | "BookMark"
  | "Share";
const HomeListItemActionBar = ({ count }: { count: ActionCount }) => {
  const { Comments, Hearts, Reposts } = count;

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
          <Actions type="RePost" icon={ActionBarReTweet} count={Reposts} />
        );

      case "Heart":
        return <Actions type="Heart" icon={ActionBarHeart} count={Hearts} />;

      case "View":
        return <Actions type="View" icon={ActionBarView} count={Comments} />;

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
