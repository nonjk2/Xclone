"use client";
import { close, prev } from "@/lib/Icon";
import { Icon } from "../../ui/icon/GoogleIcon";
import { useRecoilState } from "recoil";
import { stepState } from "@/context/store/signState";
import { useRouter } from "next/navigation";

const SignInHeader = () => {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };
  return (
    <div className="flex px-4 items-center flex-row justify-start h-[53px]">
      <div className="flex relative justify-start items-center self-stretch min-h-[32px] min-w-[56px] ">
        <div className="header-btn" onClick={onClickClose}>
          <Icon color="#000" height={5} path={close} width={5} />
        </div>
      </div>
      <div className="items-start"></div>
    </div>
  );
};
export default SignInHeader;
