"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode } from "react";

interface IdPathProps {
  id: string;
  nickname?: string;
  children?: ReactNode;
  message?: boolean;
}
const IdPath = ({ id, nickname, children, message = false }: IdPathProps) => {
  const router = useRouter();
  const onClickHandler: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    if (message) {
      return;
    }
    e.stopPropagation();
    router.push(`/${id}`);
  };
  if (nickname) {
    return (
      <span
        onClick={onClickHandler}
        className={`text-[15px] ${message ? "" : "hover:underline"}`}
      >
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
