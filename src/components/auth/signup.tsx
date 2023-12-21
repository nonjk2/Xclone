/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Signfirst from "./signupFirst";
import SignHeader from "./signHeader";
import { useRecoilState } from "recoil";
import {
  initialState,
  signAgreementState,
  stepState,
  textState,
} from "@/context/store/signState";
import SignSecond from "./signupSecond";
import { useCallback, useEffect } from "react";

const SignUpMain = () => {
  const [SignStep, setSignStep] = useRecoilState(stepState);
  const [signChecked, setSignChecked] = useRecoilState(signAgreementState);
  const [formData, setFormData] = useRecoilState(textState);
  //   const [id, setId] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [nickname, setNickname] = useState("");
  //   const [image, setImage] = useState("");
  //   const [imageFile, setImageFile] = useState<File>();
  useEffect(() => {
    return () => {
      setSignStep(1);
      setFormData(initialState);
      setSignChecked(false);
    };
  }, []);

  const StepSignUp = useCallback(() => {
    switch (SignStep) {
      case 1:
        return <Signfirst />;
      case 2:
        return <SignSecond />;
      //   case 3:
      //     return <SignThird nextStep={nextStep} />;
      //   case 4:
      //     return <SignFourth nextStep={nextStep} />;
      //   case 5:
      //     return <SignFive />;
      default:
        return null;
    }
    return null;
  }, [SignStep]);

  return (
    <div className="items-stretch overflow-hidden min-w-[600px] h-[650px] max-h-[90vh] max-w-[80vw] min-h-[400px]">
      <SignHeader />
      <StepSignUp />
      {/* <Signfirst /> */}
    </div>
  );
};
export default SignUpMain;
