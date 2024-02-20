"use client";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
export const StyleContext = createContext<{
  photoBoard: boolean;
  setphotoBoard: (value: boolean) => void;
}>({
  photoBoard: false,
  setphotoBoard: (value) => {},
});
const StyleProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [photoBoard, setphotoBoard] = useState<boolean>(false);

  useEffect(() => {
    const body = document.body;
    if (pathname.includes("status")) {
      body.style.overflow = "hidden";
      body.style.color = "";
    } else {
      body.style.overflow = "";
      body.style.backdropFilter = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.backdropFilter = "";
    };
  }, [pathname]);

  return (
    <StyleContext.Provider value={{ photoBoard, setphotoBoard }}>
      {children}
    </StyleContext.Provider>
  );
};
export default StyleProvider;
