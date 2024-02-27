import { user1, user2, user3 } from "@/__test__/MockPostData";
import MessageUserItem from "./MessageUserItem";

const DATA = [user1, user2, user3];

const MessageList = () => {
  return (
    <>
      {DATA.map((user) => (
        <MessageUserItem User={user} key={user.nickname} />
      ))}
    </>
  );
};
export default MessageList;
