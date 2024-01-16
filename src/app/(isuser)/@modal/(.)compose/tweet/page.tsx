import ComposePost from "@/components/main/ComposePost";
import Modal from "@/components/ui/modal";

const Page = () => {
  return (
    <>
      <Modal width="650" height="600" compose>
        <ComposePost />
      </Modal>
    </>
  );
};
export default Page;
