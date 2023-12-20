"use client";

import style from "./signup.module.css";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import SignHeader from "../auth/signHeader";
import Signfirst from "../auth/signupFirst";
interface initailStateProp {
  state?: number;
}
export default function SignupModal({ state = 1 }: initailStateProp) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [SignStep, setSignStep] = useState(state);
  const nextStep = () => setSignStep(SignStep + 1);
  const prevStep = () => setSignStep(SignStep - 1);

  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };
  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setImageFile(e.target.files[0]);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:9090/api/users", {
      method: "post",
      body: JSON.stringify({
        id,
        nickname,
        image,
        password,
      }),
      credentials: "include",
    })
      .then((response: Response) => {
        console.log(response.status);
        if (response.status === 200) {
          router.replace("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const StepSignUp = () => {
    switch (SignStep) {
      case 1:
        return <Signfirst nextStep={nextStep} />;
      // case 2:
      //   return (
      //     <SignSecond
      //       toggle={toggle}
      //       setToggle={setToggle}
      //       nextStep={nextStep}
      //     />
      //   );
      // case 3:
      //   return <SignThird nextStep={nextStep} />;
      // case 4:
      //   return <SignFourth nextStep={nextStep} />;
      // case 5:
      //   return <SignFive />;
      default:
        return null;
    }
    return null;
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          {/* <div className={style.modalHeader}>
            <button className={style.closeButton} onClick={onClickClose}>
              <Icon color="#000" height={5} path={close} width={5} />
            </button>
            <div>계정을 생성하세요.</div>
          </div>
          <form>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  value={id}
                  onChange={onChangeId}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  value={nickname}
                  onChange={onChangeNickname}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  onChange={onChangeImageFile}
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button className={style.actionButton} disabled>
                가입하기
              </button>
            </div>
          </form> */}
          <div className="items-stretch overflow-hidden min-w-[600px] h-[650px] max-h-[90vh] max-w-[80vw] min-h-[400px]">
            {/* 헤더 */}
            <SignHeader />
            <StepSignUp />
          </div>
        </div>
      </div>
    </>
  );
}
