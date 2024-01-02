import SignInMain from "@/components/auth/signin/signIn";
import Modal from "@/components/ui/modal";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Modal height="650" width="600">
        <Suspense fallback={<>loading...</>}>
          <SignInMain />
        </Suspense>
      </Modal>
    </>
  );
}
