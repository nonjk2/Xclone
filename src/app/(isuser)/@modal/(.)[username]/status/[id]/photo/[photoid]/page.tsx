import PhotoComponents from "@/components/photo/PhotoComponents";
import Modal from "@/components/ui/modal";
import KeyDownProvider from "@/context/KeyDownProvider";

const Page = async () => {
  return (
    <KeyDownProvider>
      <Modal screen>
        <PhotoComponents />
      </Modal>
    </KeyDownProvider>
  );
};
export default Page;
