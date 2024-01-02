import { atom } from "recoil";

interface SelectData {
  month: string;
  day: string;
  year: string;
}

interface FormData {
  nickname: string;
  email: string;
  password: string;
  successKey: string;
}
interface LoginFormData {
  email: string;
  password: string;
}

interface FormState {
  selectData: SelectData;
  formData: FormData;
  loginData: LoginFormData;
}

export const initialState: FormState = {
  selectData: {
    month: "",
    day: "",
    year: "",
  },
  formData: {
    nickname: "",
    email: "",
    password: "",
    successKey: "",
  },
  loginData: {
    email: "",
    password: "",
  },
};
export const textState = atom<FormState>({
  key: "loginState",
  default: initialState,
});

export const stepState = atom<1 | 2 | 3 | 4 | number>({
  key: "signStepState",
  default: 1,
});

export const signAgreementState = atom<boolean>({
  key: "signAgreementState",
  default: false,
});

export const inputIdState = atom<"nickname" | "email" | string>({
  key: "inputIdState",
  default: "nickname",
});

export const inputLoginState = atom<{ login: string; password: string }>({
  key: "inputLoginState",
  default: {
    login: "",
    password: "",
  },
});
export const inputLoginStepState = atom<number>({
  key: "inputLoginStepState",
  default: 1,
});
