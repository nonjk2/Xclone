"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode } from "react";

interface IdPathProps {
  id: string;
  nickname?: boolean;
  children?: ReactNode;
}
const IdPath = ({ id, nickname = false, children }: IdPathProps) => {
  const router = useRouter();
  const onClickHandler: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/${id}`);
  };
  if (nickname) {
    return (
      <span onClick={onClickHandler} className="text-[15px] hover:underline">
        {children}
      </span>
    );
  }
  return (
    <span
      className="text-[15px] text-inputColor font-normal"
      onClick={onClickHandler}
    >
      @{id}
    </span>
  );
};
export default IdPath;
