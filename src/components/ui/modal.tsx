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
}

const Modal = ({
  reply,
  width,
  height,
  children,
  setModal,
  type = "default",
  onClick,
}: ModalProps) => {
  const ModalWidth = `w-[600px]`;
  const ModalHeight = `h-[${height}px]`;
  return (
    <>
      <div
        className={`${ModalWidth} ${ModalHeight} fixed flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] bg-white rounded-2xl z-[10000] text-black overflow-hidden`}
      >
        <div className="flex h-full w-full transition-all">{children}</div>
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen bg-modalback z-40" />
    </>
  );
};

export default Modal;
