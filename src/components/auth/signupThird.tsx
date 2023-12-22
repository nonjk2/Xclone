"use client";
import { useRecoilState } from "recoil";
import DynamicInput from "../ui/dynamicInput";
import { stepState, textState } from "@/context/store/signState";

const SignThird = () => {
  const [step, setStep] = useRecoilState(stepState);
  const [formdataState, setformData] = useRecoilState(textState);
  const { formData, selectData } = formdataState;
  const nextStep = () => setStep((step) => step + 1);

  const onFocus = (id: string, step: number) => {
    if (step === 3) {
      setStep(1);
    }
    document.getElementById(id)?.focus();
  };

  return (
    <div className="flex flex-col relative px-20 max-w-[600px] grow">
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
        />
        <DynamicInput
          value={formData["email"]}
          placeholder="이메일"
          id={"email"}
          onFocus={onFocus}
          step={step}
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
        />
        <div className="hover:underline cursor-pointer whitespace-pre-wrap text-right break-words leading-5 text-blue z-50">
          <span className="inherit-span text-right cursor-pointer">
            대신 휴대폰 사용하기
          </span>
        </div>
      </div>

      {/* <div className="flex flex-col relative mt-5">
        <div className="leading-5 font-bold mb-2 text-black">생년월일</div>
        <div className="inline whitespace-pre-wrap break-words leading-4 text-sm text-inputColor">
          <span className="tracking-tight font-normal">
            이 정보는 공개적으로 표시되지 않습니다. 비즈니스, 반려동물 등 계정
            주제에 상관없이 나의 연령을 확인하세요.
          </span>
        </div>
        <div className="flex gap-3 basis-auto relative z-0 my-4 flex-row">
          <Select
            selectValue={selectData["month"]}
            onChange={handleSelectChange}
            label="월"
            count={12}
            formatOption={(i) => `${i + 1}월`}
            flexGrow={2}
            id={"month"}
          />
          <Select
            onChange={handleSelectChange}
            selectValue={selectData.day}
            id={"day"}
            label="일"
            count={31}
            formatOption={(i) => `${i + 1}일`}
            flexGrow={1}
          />
          <Select
            selectValue={selectData.year}
            id={"year"}
            onChange={handleSelectChange}
            label="년"
            count={100}
            formatOption={(i) => `${currentYear - i}년`}
            flexGrow={1}
          />
        </div>
      </div>
      <div className="flex mt-[83px]">
        <Button
          backgroundColor="black"
          color="white"
          hoverColor="hoverBlack"
          size="register"
          // onClick={nextStep}
          onClick={nextStep}
          title={
            <div className="flex justify-center text-[15px] font-bold leading-5">
              <span>다음</span>
            </div>
          }
        />
      </div> */}
    </div>
  );
};

export default SignThird;
