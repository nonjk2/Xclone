import Modal from "@/components/ui/modal";
import { ReactNode, Suspense } from "react";

const SignUpLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Modal height="650" width="600">
        <Suspense>{children}</Suspense>
      </Modal>
    </>
  );
};
export default SignUpLayout;
