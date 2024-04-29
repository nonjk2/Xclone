"use client";
import Button from "@/components/ui/button";
import { AppleIcon, GoogleIcon } from "@/components/ui/icon/GoogleIcon";
import { supabaseClient } from "@/lib/util/supabase";
import { useRouter } from "next/navigation";

const SignInButton = ({ type }: { type: "google" | "kakao" }) => {
  const { push } = useRouter();
  const handleLogin = async () => {
    // await signIn(type);
    const client = supabaseClient();
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        // skipBrowserRedirect: true,
      },
    });

    if (error) {
      throw new Error("failed to sign in");
    }
    if (data) {
      console.log(data);
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
