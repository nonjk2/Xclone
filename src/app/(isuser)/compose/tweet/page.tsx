import ComposePost from "@/components/main/ComposePost";
import Modal from "@/components/ui/modal";

const Page = () => {
  return (
    <>
      <Modal width="600" height="278">
        <ComposePost />
      </Modal>
    </>
  );
};
export default Page;
