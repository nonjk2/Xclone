"use client";
import React, { ChangeEvent, FC } from "react";
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
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({
  label,
  count,
  formatOption,
  flexGrow,
  selectValue,
  id,
  onChange,
}) => {
  return (
    <div
      className={`flex relative basis-auto flex-row border border-gray rounded bg-white ${
        label === "월" ? "grow-[2]" : "grow"
      }`}
    >
      <label className="whitespace-pre-wrap px-2 absolute break-words font-normal pt-2 text-[13px] leading-4 pointer-events-none text-inputColor">
        <span>{label}</span>
      </label>
      <select
        id={id}
        value={selectValue}
        onChange={onChange}
        className="w-full p-2 pt-3 leading-5 outline-none text-[17px] mt-4 appearance-none opacity-1 text-black border-none"
      >
        {/* <option disabled /> */}
        {[...Array(count)]
          .map(() => uuidv4())
          .map((e, i) => (
            <option
              key={e}
              value={`${formatOption(i)}`}
              className="leading-5 text-[17px] cursor-pointer text-black"
            >
              {formatOption(i)}
            </option>
          ))}
      </select>
      <div className="inline-block max-w-full align-bottom select-none absolute pointer-events-none text-inputColor h-6 -mt-[0.75em] right-3 top-1/2">
        <Icon color="rgb(83, 100, 113)" height={5} width={5} path={down} />
      </div>
    </div>
  );
};

export default Select;
