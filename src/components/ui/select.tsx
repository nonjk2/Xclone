"use client";
import React, { ChangeEvent, FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "./icon/GoogleIcon";
import { down } from "@/lib/Icon";

interface SelectStyleProps {
  flexGrow?: number;
}
interface SelectProps extends SelectStyleProps {
  label: string;
  count: number;
  formatOption: (index: number) => string;
  selectValue: string;
  id: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({
  label,
  count,
  formatOption,
  flexGrow,
  selectValue,
  id,
  required = false,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`overflow-hidden flex relative basis-auto z-50 focus-within:border-blue focus-within:text-blue flex-row border border-gray rounded bg-white ${
        label === "월" ? "grow-[2]" : "grow"
      }`}
    >
      <label
        htmlFor={id}
        className="whitespace-pre-wrap focus-within:text-blue px-2 absolute break-words font-normal pt-2 text-[13px] leading-4 pointer-events-none"
      >
        {label}
      </label>
      <select
        id={id}
        value={selectValue}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={onChange}
        required={required}
        className="w-full p-2 pt-3 leading-5 outline-none text-[17px] mt-4 appearance-none opacity-1 text-black border-none"
      >
        {/* <option disabled /> */}
        {[...Array(count)]
          .map(() => uuidv4())
          .map((e, i) => (
            <option
              key={e}
              value={`${formatOption(i)}`}
              className="leading-5 text-[17px] cursor-pointer text-black bgtransparent"
            >
              {formatOption(i)}
            </option>
          ))}
      </select>
      <div className="inline-block max-w-full align-bottom select-none absolute pointer-events-none text-inputColor h-6 -mt-[0.75em] right-3 top-1/2">
        <Icon
          color={focus ? "rgb(29, 155, 240)" : ""}
          height={5}
          width={5}
          path={down}
        />
      </div>
    </div>
  );
};

export default Select;
