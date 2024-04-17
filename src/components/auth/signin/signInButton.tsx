"use client";
import Button from "@/components/ui/button";
import { AppleIcon, GoogleIcon } from "@/components/ui/icon/GoogleIcon";
import { signIn } from "next-auth/react";

const SignInButton = ({ type }: { type: "google" | "kakao" }) => {
  const handleLogin = async () => {
    // await signIn(type);
    console.log(type);
    if (type === "kakao") {
      return await signIn("kakao", { callbackUrl: "/", redirect: false });
    } else if (type === "google") {
      return await signIn("google", { callbackUrl: "/home", redirect: false });
    }
  };
  if (type === "kakao") {
    return (
      <Button
        onClick={handleLogin}
        hoverColor="hoverLightBlack"
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
    );
  }
  return (
    <Button
      onClick={handleLogin}
      hoverColor="hoverLightBlue"
      size="login1"
      color="blue"
      backgroundColor="white"
      borderColor="gray"
      title={
        <div className="flex items-center justify-center gap-1 font-bold">
          <GoogleIcon height={18} path="" width={18} isgoogle isHover />
          <span className="google-span">Google 계정으로 로그인</span>
        </div>
      }
    />
  );
};
export default SignInButton;
