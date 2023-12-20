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

const initialState: FormState = {
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
