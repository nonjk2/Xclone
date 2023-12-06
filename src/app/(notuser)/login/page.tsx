import Image from "next/image";
import Link from "next/link";
import zLogo from "@/../public/zlogo.png";

const LoginPage = () => {
  return (
    <div className="flex bg-white w-full h-full">
      <div className="flex-1 flex justify-center items-center">
        <Image src={zLogo} alt="logo" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="font-bold text-64 mb-12">지금 일어나고 있는 일</h1>
        <h2 className="font-bold text-31 mb-8">지금 가입하세요.</h2>
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
  );
};
export default LoginPage;
