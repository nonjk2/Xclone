import { ChangeEvent, FocusEventHandler, FormEvent } from "react";
import { Icon } from "./icon/GoogleIcon";
import { explore } from "@/lib/Icon";
interface InputStyleProps {
  size: "large" | "medium";
  show?: boolean;
}

const sizeStyles = {
  large: `w-[502px] h-[44px]`,
  medium: `w-[350px] h-[42px]`,
};

//
export interface InputProps extends InputStyleProps {
  handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  className?: string;
  value?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>; // 추가
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    placeholder,
    size,
    value,
    handleInputChange,
    handleInputSubmit,
    onFocus,
    onBlur,
  } = props;

  return (
    <>
      <div className={`relative`}>
        <form
          className={`bg-gubunsun flex flex-row box-border overflow-hidden ${sizeStyles[size]} rounded-full border-white border border-opacity-0 focus-within:border-blue focus-within:bg-white`}
          onSubmit={handleInputSubmit}
        >
          <div className="bg-transparent pl-3 flex items-center justify-center w-11 h-[42px]">
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
            value={value}
            onChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </form>
      </div>
    </>
  );
};

export default Input;
