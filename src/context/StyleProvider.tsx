"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const StyleProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
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
  return <>{children}</>;
};
export default StyleProvider;
