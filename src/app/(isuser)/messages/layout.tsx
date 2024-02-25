import Header from "@/components/main/center/header/Header";
import MessagesHeader from "@/components/main/center/header/MessagesHeader";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex w-[1050px]">
      <section className="w-[450px] bg-blue">
        <MessagesHeader />
      </section>
      <section className="grow w-full mx-auto max-w-[600px] bg-green">
        {children}
      </section>
    </main>
  );
};
export default layout;
