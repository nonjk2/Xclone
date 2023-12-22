import { inputIdState } from "@/context/store/signState";
import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";

interface InputProps {
  value: string;
  type?: "text" | "password"; // 예시로 text와 password만 사용 가능하도록 함
  placeholder: string;
  disabled?: boolean;
  handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  autoFocus?: boolean;
  onFocus?: (id: string, step: number) => void;
  step: number;
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
}) => {
  const [active, setActive] = useState(false);
  const setId = useSetRecoilState(inputIdState);
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
        className={`border rounded ${
          active ? "border-blue" : "border-gray"
        }  transition-all flex-row`}
      >
        <div className="absolute flex-row w-full h-full justify-between">
          {/* wrapper */}
          <div
            className={`truncate input-transition leading-6 transition-all ${
              disabled || value.length >= 1 || active
                ? "text-xs pt-2"
                : "text-[17px] pt-4"
            } ${active ? "text-blue" : "text-inputColor"} pl-2 pr-2`}
          >
            {placeholder}
          </div>
        </div>
        <div className="overflow-hidden pt-3 px-2 pb-2 flex-row flex-grow flex-shrink-0 mt-4">
          <div className="flex items-center w-full text-[17px] leading-6">
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
              className={`z-50 cursor-text w-full outline-none border-none appearance-none resize-none bgtransparent ${
                disabled ? "text-gray-700" : "text-black"
              }`}
              id={id}
            />
          </div>
        </div>
      </label>
    </div>
  );
};

export default DynamicInput;
