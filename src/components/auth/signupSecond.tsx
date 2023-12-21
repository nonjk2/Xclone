"use client";
import { signAgreementState, stepState } from "@/context/store/signState";
import { useRecoilState } from "recoil";
import { Icon } from "../ui/icon/GoogleIcon";
import { check } from "@/lib/Icon";

const SignSecond = () => {
  const [toggle, setToggle] = useRecoilState(signAgreementState);
  const [step, setStep] = useRecoilState(stepState);
  const nextStep = () => setStep(step + 1);
  const changeToggle = () => setToggle((toggle) => !toggle);
  // const { toggle, nextStep, setToggle } = props;
  return (
    <div className="grow w-full shrink max-w-[600px] px-20">
      <div className="my-5">
        <h1 className="font-bold text-[31px] leading-9 text-black">
          <span className="inherit-span">트위터 환경을 맞춤 설정하세요</span>
        </h1>
      </div>
      <div className="mt-5 font-bold text-xl leading-6 text-black">
        <span className="inherit-span">
          웹에서 트위터 콘텐츠가 표시되는 위치를 추적하세요
        </span>
      </div>
      <label className="flex flex-row justify-between mt-3">
        <div className="flex relative shrink pr-3 leading-5 text-black">
          <span>
            트위터는 이 데이터를 이용해 사용자 경험을 맞춤 설정합니다. 이 웹
            브라우징 기록은 절대 사용자 이름, 이메일 또는 전화번호와 함께
            저장되지 않습니다.
          </span>
        </div>
        <div className="flex" onClick={changeToggle}>
          <label className="cursor-pointer">
            <div className="flex items-center flex-row grow justify-between gap-2 select-none">
              <div
                className={`cursor-pointer select-none items-stretch flex-col rounded-full -m-2 p-2 transition-all duration-200 outline-none ${
                  toggle
                    ? "hover:bg-hoverLightBlue"
                    : "hover:bg-hoverLightBlack"
                }`}
              >
                <div
                  className={`cursor-pointer relative z-0 border-[2px] rounded w-5 h-5 items-center ${
                    toggle
                      ? "border-blue bg-blue"
                      : "border-inputColor bg-white"
                  }`}
                >
                  {toggle && (
                    <Icon path={check} height={4} width={4} color="#fff" />
                  )}
                </div>
              </div>
            </div>
          </label>
        </div>
      </label>
      {/* <InformationDongeDiv dir="ltr">
        <span>
          <span>가입하면 트위터의 </span>
        </span>
        <a
          href="https://twitter.com/tos#new"
          rel="noopener noreferrer nofollow"
          target="_blank"
          role="link"
        >
          <span>
            <span>운영원칙</span>
          </span>
        </a>
        <span>
          <span>, </span>
        </span>
        <a
          href="https://twitter.com/privacy"
          rel="noopener noreferrer nofollow"
          target="_blank"
          role="link"
        >
          <span>
            <span>개인정보 처리방침</span>
          </span>
        </a>
        <span>
          <span> 및 </span>
        </span>
        <a
          href="https://support.twitter.com/articles/20170514"
          rel="noopener noreferrer nofollow"
          target="_blank"
          role="link"
        >
          <span>
            <span>쿠키 사용</span>
          </span>
        </a>
        <span>
          <span>
            에 동의하게 됩니다. 트위터에서는 개인정보 처리방침에 명시된 목적에
            따라 이메일 주소 및 전화번호 등 내 연락처 정보를 사용할 수 있습니다.{" "}
          </span>
        </span>
        <a
          href="https://twitter.com/privacy"
          rel="noopener noreferrer nofollow"
          target="_blank"
          role="link"
        >
          <span>
            <span>자세히 알아보기</span>
          </span>
        </a>
      </InformationDongeDiv> */}
      {/* <NextStepSecondButtonDiv>
        <Button
          backgroundColor="black"
          color="white"
          hoverColor="hoverBlack"
          size="register"
          // onClick={nextStep}
          onClick={nextStep}
          title={
            <ButtonTitleStyleNextButton>
              <span>다음</span>
            </ButtonTitleStyleNextButton>
          }
        />
      </NextStepSecondButtonDiv> */}
    </div>
  );
};
export default SignSecond;
