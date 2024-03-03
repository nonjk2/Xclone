import Button from "@/components/ui/button";
import DynamicInput from "@/components/ui/dynamicInput";
import { inputLoginState } from "@/context/store/signState";
import { useRecoilState } from "recoil";

const SignInSecond = () => {
  const [loginInputValue, setLoginInputValue] = useRecoilState(inputLoginState);
  const signInOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setLoginInputValue({ ...loginInputValue, [id]: value });
  };
  return (
    <>
      <form action="">
        <div className="w-full h-[453px] m-auto px-20">
          <div className="flex items-center w-full h-[76px]">
            <h1 className="font-bold text-[31px] text-blackText">
              <span>비밀번호를 입력하세요</span>
            </h1>
          </div>

          <DynamicInput
            placeholder="이메일"
            id="login"
            type="email"
            disabled
            value={loginInputValue["login"]}
          />
          <DynamicInput
            placeholder="비밀번호"
            id="password"
            type="password"
            handleInputChange={signInOnChangeHandler}
            value={loginInputValue["password"]}
          />
        </div>
        <div className="w-full h-[144px] px-20">
          <div className="flex w-full h-[100px] my-6">
            <Button
              backgroundColor="black"
              color="white"
              hoverColor="hoverBlack"
              size="register"
              // onClick={nextStep}
              //   onClick={nextStep}
              title={
                <div className="flex justify-center text-[17px] font-bold leading-5">
                  <span>로그인하기</span>
                </div>
              }
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default SignInSecond;
