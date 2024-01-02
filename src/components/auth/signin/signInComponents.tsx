"use client";
import Button from "@/components/ui/button";
import DynamicInput from "@/components/ui/dynamicInput";
import { GoogleIcon, AppleIcon } from "@/components/ui/icon/GoogleIcon";
import {
  inputLoginState,
  inputLoginStepState,
} from "@/context/store/signState";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import SignInFirst from "./signInFirst";
import SignInSecond from "./signInSecond";

const SignInComponent = () => {
  const [loginStep, setLoginStep] = useRecoilState(inputLoginStepState);

  useEffect(() => {
    return () => {
      setLoginStep(1);
    };
  }, [setLoginStep]);

  const StepSignIn = useCallback(() => {
    switch (loginStep) {
      case 1:
        return <SignInFirst />;
      case 2:
        return <SignInSecond />;

      default:
        null;
    }
  }, [loginStep]);

  return (
    <div className="flex flex-col w-full">
      <StepSignIn />
    </div>
  );
};

export default SignInComponent;
