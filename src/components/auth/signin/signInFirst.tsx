import Button from "@/components/ui/button";
import DynamicInput from "@/components/ui/dynamicInput";
import { GoogleIcon, AppleIcon } from "@/components/ui/icon/GoogleIcon";
import {
  inputLoginState,
  inputLoginStepState,
} from "@/context/store/signState";
import { useRecoilState } from "recoil";

const SignInFirst = () => {
  const [loginStep, setLoginStep] = useRecoilState(inputLoginStepState);
  const [loginInputValue, setLoginInputValue] = useRecoilState(inputLoginState);
  const signInOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setLoginInputValue({ ...loginInputValue, login: value });
  };
  const signInNextLoginStep = () => {
    setLoginStep(loginStep + 1);
  };
  return (
    <>
      <div className="h-[536px] m-auto">
        <div className="flex items-center w-full h-[76px]">
          <h1 className="font-bold text-[31px] text-blackText">
            <span>트위터에 로그인하기</span>
          </h1>
        </div>
        <div className="w-[300px] py-3 max-w-[380px]">
          <Button
            // onClick={() => socialhandler(googleLinkOptions)}
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
        </div>
        <div className="w-[300px] py-3 max-w-[380px]">
          <Button
            // onClick={() => socialhandler(googleLinkOptions)}
            hoverColor="hoverLightBlue"
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
        </div>

        <div className="max-w-[380px] -my-1 w-[300px] h-7">
          <div className="items-stretch box-border flex my-1 -mx-1 flex-row">
            <div className="flex flex-1 justify-center flex-col mx-1 min-w-0">
              <div className="bg-gubunsun h-[1px]" />
            </div>
            <div>
              <span className="break-words leading-5 font-normal text-blackText">
                또는
              </span>
            </div>
            <div className="flex flex-1 justify-center flex-col mx-1 min-w-0">
              <div className="bg-gubunsun h-[1px]" />
            </div>
          </div>
        </div>

        {/* Input */}
        <DynamicInput
          placeholder="휴대폰 번호, 이메일 주소 또는 사용자아이디"
          id="login"
          type="email"
          value={loginInputValue["login"]}
          handleInputChange={signInOnChangeHandler}
        />

        <div className="flex py-3">
          <Button
            backgroundColor="black"
            color="white"
            hoverColor="hoverBlack"
            size="login2"
            onClick={signInNextLoginStep}
            title={
              <div className="flex justify-center text-[15px] font-bold leading-5">
                <span>다음</span>
              </div>
            }
          />
        </div>
        <div className="flex py-3">
          <Button
            backgroundColor="white"
            color="black"
            hoverColor="hoverLightBlack"
            size="login2"
            // onClick={nextStep}
            title={
              <div className="flex justify-center text-[15px] font-bold leading-5">
                <span>비밀번호를 잊으셨나요?</span>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};
export default SignInFirst;
