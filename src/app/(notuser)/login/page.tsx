import Image from "next/image";
import Link from "next/link";
import { logo, main } from "../../../../public";
import Footer from "@/components/flow/footer";

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

        <div className="flex-1 flex flex-col max-w-[45vw]">
          <div className="flex flex-col items-stretch relative p-9 w-full max-w-[760px] min-w-[45dvw]">
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
            <Link href="/i/flow/signup" className="signup btn">
              계정 만들기
            </Link>
            <h3 className="font-bold text-17 mt-2.5 mb-1.5">
              이미 트위터에 가입하셨나요?
            </h3>
            <Link href="/login" className="login btn">
              로그인
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default LoginPage;
