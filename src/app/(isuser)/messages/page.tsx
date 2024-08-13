"use client";
import Button from "@/components/ui/button";
// import Button from "@/components/ui/button";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (!pending && isLoading) {
      setPending(true);
    } else if (pending && !isLoading && data) {
      console.log(data[0]);
      router.replace(`/messages/${data[0]}`);
    }
  }, [data, isLoading, pending, router]);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="fixed flex bottom-0 w-full max-w-md">
          <input
            className="flex-1 p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
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
    </div>
  );
};
export default Chat;
