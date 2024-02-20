"use client";
import { close } from "@/lib/Icon";
import { Icon } from "../ui/icon/GoogleIcon";
import { useRouter } from "next/navigation";

const CloseButton = () => {
  const router = useRouter();
  return (
    <div className="absolute flex justify-center items-center left-0 top-0 w-[60px] h-[60px]">
      <div className="relative">
        <div
          onClick={() => router.back()}
          className={`flex items-center justify-center z-20 hover:bg-ButtonOpacity cursor-pointer w-[34.75px] h-[34.75px] bg-ButtonIconOpacity transition-all duration-200 rounded-full`}
        >
          <Icon
            color={"rgb(255, 255, 255)"}
            height={5}
            width={5}
            path={close}
          />
        </div>
      </div>
    </div>
  );
};
export default CloseButton;
