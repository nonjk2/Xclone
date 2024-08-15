"use client";

import { Message, useChat } from "ai/react";
import Button from "../ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "@/lib/util/supabase";
import { getChatQuery } from "@/lib/hooks/useGetChat";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type getMessage = {
  role: "function" | "user" | "assistant" | "data" | "system" | "tool";
  content: string;
  id: string;
};
type arrayMessage = getMessage[];

interface ChatDataType {
  id: string;
  created_at: string;
  user_id: string;
  role: string;
  session_id: string;
  content: string;
}

const PersonalChatComponent = ({ session_id }: { session_id: string }) => {
  const queryClient = useQueryClient();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    body: { sessionId: session_id },
    onFinish: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "chatSession"] });
    },
  });

  // console.log("session_id : " + session_id);
  const client = supabaseClient();
  const { data } = useQuery<
    ChatDataType[],
    Object,
    ChatDataType[],
    [_1: string, _2: string, _3: string]
  >(getChatQuery({ client, session_id }));
  if (!data) {
    redirect("/messages");
  }
  const { content, created_at, id, role, user_id } = data[0];

  const contentWithIds: arrayMessage = JSON.parse(content).map(
    (item: any, index: any) => {
      return { id: uuidv4(), ...item };
    }
  );
  const MessageComponent = (
    array:
      | {
          role: "function" | "user" | "assistant" | "data" | "system" | "tool";
          content: string;
          id: string;
        }[]
      | Message[]
  ) => {
    return array.map((m) => (
      <div key={m.id} className="whitespace-pre-wrap">
        {m.role === "user" ? "User: " : "AI: "}
        {m.content}
      </div>
    ));
  };

  return (
    <>
      {MessageComponent(contentWithIds)}
      {MessageComponent(messages)}
      <form onSubmit={handleSubmit}>
        <div className="fixed flex bottom-0 w-full max-w-md">
          <input
            className="flex-1 p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />

          <Button
            type="submit"
            size="message"
            color="blue"
            hoverColor="hoverBgblue"
            backgroundColor="blue"
            borderColor="blue"
            title={
              <span className="text-white font-bold text-lg">new Message</span>
            }
          />
        </div>
      </form>
    </>
  );
};
export default PersonalChatComponent;
