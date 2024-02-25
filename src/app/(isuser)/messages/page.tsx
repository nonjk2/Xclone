import Button from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col w-[400px] px-9">
        <span className="text-blackText leading-9 text-[31px] font-bold mb-2">
          Select a message
        </span>
        <span className="text-[15px] mb-9 text-inputColor">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </span>

        <Button
          type="button"
          size="message"
          color="blue"
          hoverColor="hoverBgblue"
          backgroundColor="blue"
          borderColor="blue"
          title={<span>new Message</span>}
        />
      </div>
    </div>
  );
};
export default page;
