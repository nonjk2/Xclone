import { user1, user2, user3 } from "@/__test__/MockPostData";
import MessageUserItem from "./MessageUserItem";
import { serverClient } from "@/lib/util/serverSBClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getChatSessionByUser } from "@/lib/hooks/useGetChatSessions";
import ChatSessionPage from "./ChatSessionPage";

const DATA = [user1, user2, user3];

const MessageList = async () => {
  const client = serverClient();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getChatSessionByUser({ client }));
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <ChatSessionPage />
      </HydrationBoundary>
    </>
  );
};
export default MessageList;
