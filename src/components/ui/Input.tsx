import {
  ChangeEvent,
  FocusEventHandler,
  FormEvent,
  InputHTMLAttributes,
} from "react";
import { Icon } from "./icon/GoogleIcon";
import { explore } from "@/lib/Icon";

const sizeStyles = {
  large: `w-[502px] h-[44px]`,
  medium: `w-[350px] h-[42px]`,
};

//
export interface InputProps {
  onInputSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  InputProps: {
    handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    sizes: "large" | "medium";
    show?: boolean;
  } & InputHTMLAttributes<HTMLInputElement>;
}

const Input: React.FC<InputProps> = (props) => {
  const { InputProps, onInputSubmit: handleInputSubmit } = props;
  const { sizes, placeholder } = InputProps;

  return (
    <>
      <div className={`relative grow`}>
        <form
          className={`bg-gubunsun w-full flex h-11 flex-row box-border overflow-hidden ${sizeStyles[sizes]} rounded-full border-white border border-opacity-0 focus-within:border-blue focus-within:bg-white`}
          onSubmit={handleInputSubmit}
        >
          <div className="bg-transparent pl-3 flex items-center justify-center w-11">
            <Icon
              path={explore}
              width={5}
              height={5}
              color="rgb(83, 100, 113)"
            />
          </div>
          <input
            className="w-full bg-gubunsun focus:bg-white border-none outline-none p-3 placeholder:text-[15px]"
            placeholder={placeholder}
            {...InputProps}
          />
        </form>
      </div>
    </>
  );
};

export default Input;
