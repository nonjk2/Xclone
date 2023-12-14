import Image from "next/image";
import Link from "next/link";
import { logo, main } from "../../../../public";
import Footer from "@/components/flow/footer";
import Button from "@/components/ui/button";
import { AppleIcon, GoogleIcon } from "@/components/ui/icon/GoogleIcon";

const LoginPage = () => {
  return (
    <div className="flex flex-col bg-white w-full h-full">
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

        <div className="flex-1 flex flex-col max-w-[45vw] p-9">
          <div className="flex flex-col items-stretch relative w-full max-w-[760px]">
            <div className="pb-3 h-[57px] w-11 bg-rgb(29, 155, 240)">
              <Image
                src={logo}
                alt="logo"
                className="w-full h-full fill-[rgb(29, 155, 240)]"
              />
            </div>
            <div className="twitterSpan tracking-[-1.2px] text-[64px] font-[rgb(15, 20 ,25)] leading-[84px] font-bold overflow-clip mt-12 mb-12">
              <span className="">지금 일어나고 있는 일</span>
            </div>
            <div className="mb-8 twitterSpan leading-9 text-[31px]">
              <span className="">오늘 트위터에 가입하세요.</span>
            </div>

            {/* 로그인 폼 섹션 */}
            <div className="w-full h-[356px]">
              <div className="w-[300px] mb-3 max-w-[380px]">
                <Button
                  // onClick={() => socialhandler(googleLinkOptions)}
                  hoverColor="hoverLightBlue"
                  size="login1"
                  color="blue"
                  backgroundColor="white"
                  borderColor="gray"
                  title={
                    <div className="flex items-center justify-center gap-1">
                      <GoogleIcon
                        height={18}
                        path=""
                        width={18}
                        isgoogle
                        isHover
                      />
                      <span className="google-span">
                        Google 계정으로 로그인
                      </span>
                    </div>
                  }
                />
              </div>
              <div className="w-[300px] mb-0 max-w-[380px]">
                <Button
                  // onClick={() => socialhandler(googleLinkOptions)}
                  hoverColor="hoverLightBlue"
                  size="login1"
                  color="blue"
                  backgroundColor="white"
                  borderColor="gray"
                  title={
                    <div className="flex items-center justify-center gap-1">
                      <AppleIcon />
                      Apple에서 가입하기
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
              <Link href="/i/flow/signup" className="signup btn mb-3">
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

              <div className="w-[300px] mt-16">
                <h3 className="font-bold text-17 mb-5">
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
      <Footer />
    </div>
  );
};
export default LoginPage;
