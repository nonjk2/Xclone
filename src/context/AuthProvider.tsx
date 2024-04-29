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
      switch (event) {
        case "INITIAL_SESSION":
          console.log(event, session);
        case "MFA_CHALLENGE_VERIFIED":
          console.log(event, session);
        case "PASSWORD_RECOVERY":
          console.log(event, session);
        case "SIGNED_IN":
          setTimeout(async () => {
            if (session) {
              const userId = session.user.id as string;
              const { data: user, error } = await client
                .from("userinfo")
                .select("*")
                .eq("id", userId)
                .maybeSingle();

              if (error) {
                console.error("Error fetching user info:", error.message);
                return;
              }

              if (user) {
                setSession((prevSession: any) => ({
                  ...prevSession,
                  user: {
                    ...prevSession?.user,
                    user_metadata: {
                      ...prevSession?.user?.user_metadata,
                      nickname: user.nickname,
                    },
                  },
                }));
              }
            }
          }, 50);
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
