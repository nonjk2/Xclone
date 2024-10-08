"use client";

import { getChatSessionByUser } from "@/lib/hooks/useGetChatSessions";
import { supabaseClient } from "@/lib/util/supabase";
import { useQuery } from "@tanstack/react-query";
import MessageUserItem from "./MessageUserItem";

export type getChatSessionType = {
  content: string;
  created_at: string;
  id: string;
  role: string;
  session_id: string;
  user_id: string;
};

const ChatSessionPage = () => {
  const client = supabaseClient();
  const { data } = useQuery<
    getChatSessionType[],
    Object,
    getChatSessionType[],
    [_1: string, _2: string]
  >(getChatSessionByUser({ client }));

  console.log(data);
  return (
    <div className="flex w-full flex-col">
      {data && data.map((e) => <MessageUserItem key={e.id} session={e} />)}
    </div>
  );
};
export default ChatSessionPage;
