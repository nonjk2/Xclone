import { Icon } from "@/components/ui/icon/GoogleIcon";
import { MessagePlus, setting } from "@/lib/Icon";

const MessagesHeader = () => {
  return (
    <div className="flex max-w-[600px] w-full h-[53px] px-4">
      <div className="flex grow items-center">
        <div>
          <span className="text-xl font-bold">Messages</span>
        </div>
      </div>
      <div className="flex h-full items-center">
        <div className="group flex items-center justify-center relative w-[34px] h-[34px] cursor-pointer">
          <div
            className="group-hover:bg-hoverLightBlack w-full h-full absolute flex justify-center items-center rounded-full flex-row cursor-pointer transition-all duration-200"
            title="close"
          />
          <Icon path={setting} height={5} width={5} />
        </div>
        <div className="group/close flex items-center justify-center relative w-[34px] h-[34px] cursor-pointer">
          <div
            className="group-hover/close:bg-hoverLightBlack w-full h-full absolute flex justify-center items-center rounded-full flex-row cursor-pointer transition-all duration-200"
            title="close"
          />
          <Icon path={MessagePlus} height={5} width={5} />
        </div>
      </div>
    </div>
  );
};
export default MessagesHeader;
