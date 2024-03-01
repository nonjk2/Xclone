import { inputIdState } from "@/context/store/signState";
import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Icon } from "./icon/GoogleIcon";
import { inputCheck } from "@/lib/Icon";

interface InputProps {
  value: string;
  type?: "text" | "password" | "email"; // 예시로 text와 password만 사용 가능하도록 함
  placeholder: string;
  disabled?: boolean;
  handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  autoFocus?: boolean;
  onFocus?: (id: string, step: number) => void;
  step?: number;
  hasIcon?: boolean;
  validationMessages?: string;
  validation?: boolean;
}

const DynamicInput: React.FC<InputProps> = ({
  value,
  type = "text",
  placeholder,
  disabled = false,
  handleInputChange = () => {},
  id,
  onFocus,
  autoFocus = false,
  step,
  hasIcon = false,
  validationMessages,
  validation,
}) => {
  const [active, setActive] = useState(false);
  const setId = useSetRecoilState(inputIdState);

  const getBorderClass = () => {
    if (value.length === 0) return "border-inputColor";
    if (active) return validation ? "border-red" : "border-blue";
    return validation ? "border-red" : "border-inputColor";
  };

  const getTextClass = () => {
    if (value.length === 0) return "text-inputColor";
    if (active) return validation ? "text-red" : "text-blue";
    return validation ? "text-red" : "text-inputColor";
  };

  return (
    <div
      className="py-3 w-full flex flex-col relative"
      onMouseUp={() => {
        onFocus && step === 3 && onFocus(id, step);
        setId(id);
      }}
    >
      <label
        htmlFor={id}
        className={`border rounded ${getBorderClass()} transition-all flex-row
        ${disabled ? "bg-gubunsun border-gubunsun" : "bg-white"} 
        `}
      >
        <div className="absolute flex-row w-full h-full justify-between">
          {/* wrapper */}
          <div
            className={`truncate input-transition leading-6 transition-all ${
              disabled || value.length >= 1 || active
                ? "text-xs pt-2"
                : "text-[17px] pt-4"
            } ${getTextClass()} pl-2 pr-2`}
          >
            {placeholder}
          </div>
        </div>
        <div className="overflow-hidden pt-3 px-2 pb-2 flex-row flex-grow flex-shrink-0 mt-4">
          <div className="flex flex-row items-center w-full text-[17px] leading-6">
            <input
              disabled={disabled}
              autoFocus={autoFocus}
              type={type}
              name="text"
              dir="auto"
              value={value}
              onChange={handleInputChange}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              className={`grow z-50 cursor-text h-5 w-full outline-none border-none appearance-none resize-none bgtransparent ${
                disabled ? "text-inputColor" : "text-black"
              }`}
              id={id}
            />
            {hasIcon && (
              <Icon
                width={5}
                height={5}
                // width={5}
                path={inputCheck}
                color="rgb(0, 186, 124)"
                iconStyle="max-w-full pl-[2px] h-full inline-block"
              />
            )}
          </div>
        </div>
      </label>
      {validation && value.length > 0 && (
        <div className="flex w-full px-2 pt-1">
          <span className="leading-3 text-[13px] text-red">
            {validationMessages}
          </span>
        </div>
      )}
    </div>
  );
};

export default DynamicInput;
