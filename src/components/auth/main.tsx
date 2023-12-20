import Link from "next/link";
import { AppleIcon, GoogleIcon } from "../ui/icon/GoogleIcon";
import Button from "../ui/button";
import Image from "next/image";
import { logo, main } from "../../../public";

const Main = () => {
  return (
    <section className="w-full h-full flex containers">
      <div className="flex-1 flex justify-center items-center relative">
        <div className="flex flex-col overflow-hidden inset-0 absolute">
          <div className="absolute inset-0 w-full h-full bg-center bg-cover bg-[url(https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png)]"></div>
          <Image
            src={main}
            alt="main"
            className="inset-0 h-full opacity-0 absolute w-full -z-10 overflow-clip"
            draggable={false}
          />
        </div>
        <div className="w-full max-h-[380px] h-1/2 flex p-8 max-w-full relative select-none justify-center">
          <Image src={logo} alt="logo" className="logoimg w-auto" />
        </div>
      </div>

      <div className="flex flex-col p-9 min-w-[45vw] justify-center">
        <div className="flex flex-col items-stretch relative w-full">
          {/* <div className="pb-3 h-[57px] w-11 bg-rgb(29, 155, 240)">
        <Image
          src={logo}
          alt="logo"
          className="w-full h-full fill-[rgb(29, 155, 240)]"
        />
      </div> */}
          <div className="twitterSpan whitespace-nowrap tracking-[-1.2px] text-[64px] font-[rgb(15, 20 ,25)] font-bold overflow-clip mt-12 mb-12">
            <span className="twitterSpan">지금 일어나고 있는 일</span>
          </div>
          <div className="mb-8 twitterSpan leading-9 text-[31px]">
            <span className="">오늘 트위터에 가입하세요.</span>
          </div>

          {/* 로그인 폼 섹션 */}
          <div className="w-full h-[344px]">
            <div className="w-[300px] mb-2 max-w-[380px]">
              <Button
                // onClick={() => socialhandler(googleLinkOptions)}
                hoverColor="hoverLightBlue"
                size="login1"
                color="blue"
                backgroundColor="white"
                borderColor="gray"
                title={
                  <div className="flex items-center justify-center gap-1 font-bold">
                    <GoogleIcon
                      height={18}
                      path=""
                      width={18}
                      isgoogle
                      isHover
                    />
                    <span className="google-span">Google 계정으로 로그인</span>
                  </div>
                }
              />
            </div>
            <div className="w-[300px] max-w-[380px]">
              <Button
                // onClick={() => socialhandler(googleLinkOptions)}
                hoverColor="hoverLightBlue"
                size="login1"
                color="blue"
                backgroundColor="white"
                borderColor="gray"
                title={
                  <div className="flex w-full h-full items-center justify-center gap-1 py-[1px] px-4">
                    <AppleIcon />
                    <span className="twitterSpan text-[15px] font-semibold">
                      Apple에서 가입하기
                    </span>
                  </div>
                }
              />
            </div>

            <div className="max-w-[380px] my-1 w-[300px] h-7">
              <div className="items-stretch box-border flex my-1 -mx-1 flex-row">
                <div className="flex flex-1 justify-center flex-col mx-1 min-w-0">
                  <div className="bg-gubunsun h-[1px]" />
                </div>
                <div>
                  <span className="break-words leading-5 font-normal text-blackText">
                    또는
                  </span>
                </div>
                <div className="flex flex-1 justify-center flex-col mx-1 min-w-0">
                  <div className="bg-gubunsun h-[1px]" />
                </div>
              </div>
            </div>
            <Link href="/i/flow/signup" className="signup btn mb-2">
              계정 만들기
            </Link>
            <div className="whitespace-pre-wrap felx w-[300px] text-[11px] leading-3 mb-5 max-w-[380px] text-[rgb(83,100,113)] break-words">
              가입하시려면{" "}
              <a className="text-[rgb(29,155,240)] cursor-pointer">
                <span>쿠키 사용</span>
              </a>
              을 포함해{" "}
              <a className="text-[rgb(29,155,240)] cursor-pointer">
                <span>이용약관</span>
              </a>
              과{" "}
              <a className="text-[rgb(29,155,240)] cursor-pointer">
                <span>개인정보 처리방침</span>
              </a>
              에 동의해야 합니다.
            </div>

            <div className="w-[300px] mt-14">
              <h3 className="font-bold text-[17px] mb-5">
                이미 트위터에 가입하셨나요?
              </h3>
              <Link href="/login" className="login btn">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Main;
