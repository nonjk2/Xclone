import MessagesHeader from "@/components/main/center/header/MessagesHeader";
import MessageList from "@/components/messages/MessageList";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex w-[1050px]">
      <section className="w-[450px] border-x border-gubunsun">
        <MessagesHeader />
        <MessageList />
      </section>
      <section className="border-r border-gubunsun grow w-full mx-auto max-w-[600px] ">
        {children}
      </section>
    </main>
  );
};
export default layout;
