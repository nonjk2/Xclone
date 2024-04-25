"use client";
import { supabaseClient } from "@/lib/util/supabase";
import { Session } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
export const SessionContext = createContext<{
  session: Session | null;
}>({ session: null });
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const client = supabaseClient();
  useEffect(() => {
    const subscription = client.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "INITIAL_SESSION":
          console.log(event, session);
        case "MFA_CHALLENGE_VERIFIED":
          console.log(event, session);
        case "PASSWORD_RECOVERY":
          console.log(event, session);
        case "SIGNED_IN":
          console.log(event, session);
        case "SIGNED_OUT":
          console.log(event, session);
        case "USER_UPDATED":
          console.log(event, session);

        default:
      }
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session as Session);
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export default AuthProvider;
