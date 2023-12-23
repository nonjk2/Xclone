"use client";
import { useRecoilState } from "recoil";
import DynamicInput from "../ui/dynamicInput";
import { inputIdState, stepState, textState } from "@/context/store/signState";
import Select from "../ui/select";
import Button from "../ui/button";
import { forwardRef, useCallback, useEffect, useState } from "react";

const Signfirst = () => {
  const [id, setId] = useRecoilState(inputIdState);
  const [step, setStep] = useRecoilState(stepState);
  const [formdataState, setformData] = useRecoilState(textState);
  const { formData, selectData } = formdataState;
  const nextStep = () => setStep((step) => step + 1);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setformData({
      ...formdataState,
      selectData: { ...selectData, [id]: value },
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setformData({
      ...formdataState,
      formData: { ...formData, [id]: value },
    });
  };

  const onFocus = useCallback((id: string, step: number) => {
    // console.log(id, " id");
    // setId(id);
  }, []);

  useEffect(() => {
    document.getElementById(id)?.focus();
  }, [id]);

  const currentYear = new Date().getFullYear();

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
          handleInputChange={handleInputChange}
          placeholder="이름"
          id={"nickname"}
          // autoFocus
          onFocus={onFocus}
          step={step}
        />
        <DynamicInput
          value={formData["email"]}
          handleInputChange={handleInputChange}
          placeholder="이메일"
          id={"email"}
          onFocus={onFocus}
          step={step}
        />
        <div className="hover:underline cursor-pointer whitespace-pre-wrap text-right break-words leading-5 text-blue z-50">
          <span className="inherit-span text-right cursor-pointer">
            대신 휴대폰 사용하기
          </span>
        </div>
      </div>

      <div className="flex flex-col relative mt-5">
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
      <div className="flex mt-[92px]">
        <Button
          backgroundColor="black"
          color="white"
          hoverColor="hoverBlack"
          size="register"
          // onClick={nextStep}
          onClick={nextStep}
          title={
            <div className="flex justify-center text-[17px] font-bold leading-5">
              <span>다음</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Signfirst;
