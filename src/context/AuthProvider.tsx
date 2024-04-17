import { authOption } from "@/auth";
import { getUsers } from "@/lib/action/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQueryClient,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = async ({ children }: AuthProviderProps) => {
  const session = await getServerSession(authOption);
  const client = new QueryClient();
  if (session?.supabaseAccessToken) {
    await client.prefetchQuery({
      queryKey: ["users", session.supabaseAccessToken],
      queryFn: getUsers,
    });
    const state = dehydrate(client);
    return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
  }
  return <>{children}</>;
};

export default AuthProvider;
