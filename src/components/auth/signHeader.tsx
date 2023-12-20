"use client";
import { prev } from "@/lib/Icon";
import { Icon } from "../ui/icon/GoogleIcon";

const SignHeader = () => {
  return (
    <div className="flex px-4 items-center flex-row justify-start h-[53px]">
      <div className="flex relative justify-start items-center self-stretch min-h-[32px] min-w-[56px] ">
        {/* {SignStep < 2 ? (
                  <div className="close-container" onClick={() => navigate(-1)}>
                    <Icon color="#000" height={20} path={close} width={20} />
                  </div>
                ) : */}

        <div className="close-container" onClick={() => console.log("asd")}>
          <Icon color="#000" height={5} path={prev} width={5} />
        </div>
      </div>
      <div className="items-start">
        <h2 className="font-bold text-xl text-blackText">
          <span className="inherit-span">5단계 중 {`1`}단계</span>
        </h2>
      </div>
    </div>
  );
};
export default SignHeader;
