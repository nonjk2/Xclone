import Footer from "@/components/flow/footer";
import { ReactNode } from "react";

const LoginLayout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <section className="flex flex-col relative h-screen w-full">
      {children}
      {modal}
    </section>
  );
};
export default LoginLayout;
