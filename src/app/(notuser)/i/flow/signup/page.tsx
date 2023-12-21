import SignUpMain from "@/components/auth/signup";
import Modal from "@/components/ui/modal";
import { Suspense } from "react";

export default function Signup() {
  return (
    <>
      <Modal height="650" width="600">
        <Suspense fallback={<>loading...</>}>
          <SignUpMain />
        </Suspense>
      </Modal>
    </>
  );
}
