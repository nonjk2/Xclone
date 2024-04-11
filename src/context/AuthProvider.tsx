"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const session = useSession();
  // if (session.status === "unauthenticated") {
  //   return redirect("/");
  // }

  return <>{children};</>;
};

export default AuthProvider;
