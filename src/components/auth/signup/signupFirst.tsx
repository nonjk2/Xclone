"use client";
import { useRecoilState } from "recoil";
import DynamicInput from "../../ui/dynamicInput";
import { inputIdState, stepState, textState } from "@/context/store/signState";
import Select from "../../ui/select";
import Button from "../../ui/button";
import { useCallback, useEffect, useState } from "react";

const Signfirst = () => {
  const [id, setId] = useRecoilState(inputIdState);
  const [step, setStep] = useRecoilState(stepState);
  const [formdataState, setformData] = useRecoilState(textState);
  const { formData, selectData } = formdataState;

  const [validate, setValidator] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });
  const nextStep = () => setStep((step) => step + 1);

  // 이메일 형식 검증 함수
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 이름이 비어 있지 않고, 최소 길이를 충족하는지 검사하는 함수
  const validateName = (name: string) => {
    return name.trim().length > 0;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setformData({
      ...formdataState,
      selectData: { ...selectData, [id]: value },
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let isValid = true;

    if (id === "email") {
      isValid = validateEmail(value);
      setValidator((prev) => ({ ...prev, email: isValid }));
    } else if (id === "nickname") {
      isValid = validateName(value);
      setValidator((prev) => ({ ...prev, name: isValid }));
    }
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
  useEffect(() => {
    console.log(validate.name);
    console.log(validate.email);
  }, [validate]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col relative px-20 max-w-[600px] h-full">
      <div className="flex flex-col grow w-full h-full">
        <div className="flex relative my-5">
          <h1 className="font-bold text-[31px] leading-9 text-black">
            <span className="inherit-span">계정을 생성하세요</span>
          </h1>
        </div>

        <div className="flex flex-col relative">
          <DynamicInput
            value={formData["nickname"]}
            handleinputchange={handleInputChange}
            placeholder="이름"
            id={"nickname"}
            validation={!validate.name}
            validationMessages={"이름을 입력해주세요."}
            // autoFocus
            onFocus={onFocus}
            step={step}
            required
          />

          <DynamicInput
            value={formData["email"]}
            handleinputchange={handleInputChange}
            placeholder="이메일"
            id={"email"}
            validation={!validate.email}
            validationMessages={"올바른 이메일을 입력해 주세요."}
            onFocus={onFocus}
            step={step}
            required
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
              required
            />
            <Select
              onChange={handleSelectChange}
              selectValue={selectData.day}
              id={"day"}
              label="일"
              count={31}
              formatOption={(i) => `${i + 1}일`}
              flexGrow={1}
              required
            />
            <Select
              selectValue={selectData.year}
              id={"year"}
              onChange={handleSelectChange}
              label="년"
              count={100}
              formatOption={(i) => `${currentYear - i}년`}
              flexGrow={1}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex h-[100px] justify-center items-center min-h-[100px]">
        <Button
          backgroundColor="black"
          color="white"
          hoverColor="hoverBlack"
          size="register"
          // onClick={nextStep}
          disabled={!validate.email || !validate.name}
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
