"use client";
import { useRecoilState } from "recoil";
import DynamicInput from "../../ui/dynamicInput";
import { stepState, textState } from "@/context/store/signState";
import Button from "../../ui/button";
import { useFormState, useFormStatus } from "react-dom";

const SignThird = () => {
  const [step, setStep] = useRecoilState(stepState);
  const [formdataState, setformData] = useRecoilState(textState);
  const { formData, selectData } = formdataState;
  const { pending } = useFormStatus();
  // const [state, formAction] = useFormState(loginOnSubmit, { message: null });
  // const nextStep = () => setStep((step) => step + 1);

  const onFocus = (id: string, step: number) => {
    if (step === 3) {
      setStep(1);
    }
    document.getElementById(id)?.focus();
  };

  return (
    <div className="flex flex-col relative px-20 max-w-[600px] grow">
      <form>
        <div className="flex relative my-5">
          <h1 className="font-bold text-[31px] leading-9 text-black">
            <span className="inherit-span">계정을 생성하세요</span>
          </h1>
        </div>
        <div className="flex flex-col relative">
          <DynamicInput
            value={formData["nickname"]}
            placeholder="이름"
            id={"nickname"}
            onFocus={onFocus}
            step={step}
            hasIcon
          />
          <DynamicInput
            value={formData["email"]}
            placeholder="이메일"
            id={"email"}
            onFocus={onFocus}
            step={step}
            hasIcon
          />
          <DynamicInput
            value={
              selectData["year"] +
              "." +
              selectData["month"] +
              "." +
              selectData["day"]
            }
            placeholder="생년월일"
            id={"month"}
            onFocus={onFocus}
            step={step}
            hasIcon
          />
        </div>

        <div className="information text-[13px]">
          <span className="inherit-span">
            <span className="inherit-span">가입하면 </span>
          </span>
          <a
            className="inherit-a"
            href="https://support.twitter.com/articles/20170514"
            rel="noopener noreferrer nofollow"
            target="_blank"
            role="link"
          >
            <span className="inherit-span">
              <span className="inherit-span">쿠키 사용</span>
            </span>
          </a>
          <span className="inherit-span">
            <span className="inherit-span">을 포함해 </span>
          </span>
          <a
            className="inherit-a"
            href="https://twitter.com/tos#new"
            rel="noopener noreferrer nofollow"
            target="_blank"
            role="link"
          >
            <span className="inherit-span">
              <span className="inherit-span">이용약관</span>
            </span>
          </a>
          <span className="inherit-span">
            <span className="inherit-span"> 및 </span>
          </span>
          <a
            className="inherit-a"
            href="https://twitter.com/privacy"
            rel="noopener noreferrer nofollow"
            target="_blank"
            role="link"
          >
            <span className="inherit-span">
              <span className="inherit-span">개인정보 처리방침</span>
            </span>
          </a>
          <span className="inherit-span">
            <span className="inherit-span">
              에 동의하게 됩니다. 트위터는 계정을 안전하게 보호하고 광고를
              포함한 맞춤 서비스를 제공하는 등 트위터 개인정보 처리방침에 명시된
              목적을 위해 이메일 주소 및 전화번호 등의 내 연락처 정보를 사용할
              수 있습니다.{" "}
            </span>
          </span>
          <a
            className="inherit-a"
            href="https://twitter.com/privacy"
            rel="noopener noreferrer nofollow"
            target="_blank"
            role="link"
          >
            <span className="inherit-span">
              <span className="inherit-span">자세히 알아보기</span>
            </span>
          </a>
          <span className="inherit-span">
            <span className="inherit-span">
              . 이메일 또는 전화번호를 제공하시면 다른 사람들이 이 정보로 내
              계정을 찾을 수 있게 됩니다. 해당 정보를 제공하지 않으시려면{" "}
            </span>
          </span>
          <span role="button">
            <span className="inherit-span">
              <span className="inherit-span">여기</span>
            </span>
          </span>
          <span className="inherit-span">
            <span className="inherit-span">에서 변경하세요. </span>
          </span>
        </div>

        <div className="flex mt-[30px]">
          <Button
            backgroundColor="black"
            color="white"
            hoverColor="hoverBlack"
            size="register"
            type="submit"
            // onClick={nextStep}
            disabled={pending}
            // onClick={nextStep}
            title={
              <div className="flex justify-center text-[17px] font-bold leading-5">
                <span>다음</span>
              </div>
            }
          />
        </div>
      </form>
    </div>
  );
};

export default SignThird;
