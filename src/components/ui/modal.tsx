"use client";
import { useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useRef } from "react";

interface ModalProps {
  type?: "default" | "twobutton";
  modal?: any;
  width?: string;
  reply?: boolean;
  height?: string;
  children: ReactNode;
  setModal?: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
  compose?: boolean;
  screen?: boolean;
}

const Modal = ({
  reply,
  width,
  height,
  children,
  setModal,
  type = "default",
  onClick,
  compose = false,
  screen = false,
}: ModalProps) => {
  const ModalWidth = `w-[600px]`;
  const ModalHeight = `h-[${height}px]`;
  const router = useRouter();
  if (screen) {
    return (
      <>
        <div
          className={`w-screen h-screen fixed flex left-0 top-0 z-[10000] text-black overflow-hidden`}
        >
          <div className="flex h-full w-full transition-all">{children}</div>
        </div>
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-modalbackscreen z-40"
          onClick={() => router.back()}
        />
      </>
    );
  }
  return (
    <>
      <div
        className={`${ModalWidth} ${ModalHeight} fixed flex left-1/2 -translate-x-1/2 ${
          compose ? "top-[5%]" : "top-1/2 -translate-y-1/2"
        } max-h-[90vh] bg-white rounded-2xl z-[10000] text-black overflow-hidden`}
      >
        <div className="flex h-full w-full transition-all">{children}</div>
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen bg-modalback z-40" />
    </>
  );
};

export default Modal;
