"use client";
import { supabaseClient } from "@/lib/util/supabase";
import { Session } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
export const SessionContext = createContext<{
  session: Session | null;
  loading: boolean;
}>({ session: null, loading: false });
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const client = supabaseClient();
  useEffect(() => {
    const subscription = client.auth.onAuthStateChange((event, session) => {
      setLoading(true);

      if (event === "SIGNED_OUT") {
        setSession(null);
        // console.log(event);
      } else if (session) {
        setSession(session as Session);
        // console.log(event);
      }
      setLoading(false);
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export default AuthProvider;
