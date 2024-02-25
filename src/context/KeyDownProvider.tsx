"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface KeyDownProviderProps {
  children: ReactNode;
}
const KeyDownProvider = ({ children }: KeyDownProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);
  return <>{children}</>;
};
export default KeyDownProvider;
