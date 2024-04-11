"use client";
import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import RecoilProvider from "@/context/RecoilProvider";
import StyleProvider from "@/context/StyleProvider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <QueryProvider>
          <RecoilProvider>
            <StyleProvider>{children}</StyleProvider>
          </RecoilProvider>
        </QueryProvider>
      </AuthProvider>
    </SessionProvider>
  );
};
export default Providers;
