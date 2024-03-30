import { HTMLAttributes, ReactNode } from "react";

const HoverIcons = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`w-[34.75px] h-[34.75px] flex items-center justify-center rounded-full transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
export default HoverIcons;
