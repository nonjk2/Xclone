"use client";
import Button from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icon/GoogleIcon";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  const handleLogin = async () => {
    // signIn 함수의 세 번째 파라미터로는 새 창에서 로그인하도록 설정할 수 있는 옵션이 있습니다.
    // 여기서는 redirect: false로 설정하고, window.open을 사용하여 새 창에서 로그인 페이지를 엽니다.

    await signIn("google", { callbackUrl: "/home", redirect: false });
  };
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
