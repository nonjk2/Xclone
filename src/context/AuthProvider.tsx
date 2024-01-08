"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilProviderProps {
  children: ReactNode;
}

const RecoilProvider = ({ children }: RecoilProviderProps) => {
  return <>{children}</>;
};

export default RecoilProvider;
