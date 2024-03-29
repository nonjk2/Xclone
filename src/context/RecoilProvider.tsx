"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilProviderProps {
  children: ReactNode;
}

const RecoilProvider = ({ children }: RecoilProviderProps) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>;
    </SessionProvider>
  );
};

export default RecoilProvider;
