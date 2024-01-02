"use client";
import SignInHeader from "./signInHeader";
import SignInComponent from "./signInComponents";
import { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import { inputLoginState } from "@/context/store/signState";

const SignInMain = () => {
  const [loginValue, setLoginValue] = useRecoilState(inputLoginState);
  useEffect(() => {
    return () => {
      setLoginValue({ login: "", password: "" });
    };
  }, [setLoginValue]);

  return (
    <section className="w-full h-full">
      <SignInHeader />
      <Suspense>
        <SignInComponent />
      </Suspense>
    </section>
  );
};
export default SignInMain;
