import Footer from "@/components/flow/footer";
import { ReactNode, Suspense } from "react";

const LoginLayout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <section className="flex flex-col relative h-screen w-full">
      <Suspense fallback={<>loading1</>}>{children}</Suspense>
      <Footer />
      {modal}
    </section>
  );
};
export default LoginLayout;
