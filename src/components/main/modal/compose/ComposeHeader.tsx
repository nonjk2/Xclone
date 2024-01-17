"use client";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon/GoogleIcon";
import { close } from "@/lib/Icon";
import { useRouter } from "next/navigation";

const ComposeHeader = () => {
  const { back } = useRouter();
  return (
    <div className="flex justify-between items-center h-[53px] px-4 w-full">
      <div className="relative flex items-center justify-center">
        <div
          className="absolute flex w-[34px] h-[34px] justify-center items-center rounded-full flex-row cursor-pointer hover:bg-hoverLightBlack transition-all duration-200"
          title="close"
          onClick={() => back()}
        />
        <Icon width={5} height={5} path={close} />
      </div>
      <Button
        backgroundColor="white"
        hoverColor="hoverLightBlue"
        color="blue"
        size="draft"
        title={
          <span className="font-bold text-[14px] text-blue text-center">
            Drafts
          </span>
        }
      />
    </div>
  );
};
export default ComposeHeader;
