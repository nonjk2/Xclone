import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import { authOption } from "@/auth";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import { getUsersPosts } from "@/lib/action/post-server";
import { getUsers } from "@/lib/action/server";
import useUsers from "@/lib/hooks/useUsers";
import useUsersPosts from "@/lib/hooks/useUsersPosts";
import { serverClient } from "@/lib/util/serverSBClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { ReactNode, Suspense } from "react";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string; tab: Tabs };
}) => {
  const { username } = params;
  const session = await getServerSession(authOption);
  const queryClient = new QueryClient();
  const client = serverClient(session?.supabaseAccessToken ?? "");
  await queryClient.prefetchQuery(useUsers({ client, username }));
  await queryClient.prefetchQuery(useUsersPosts({ client, username }));
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className="relative w-full">
      <HydrationBoundary state={dehydratedState}>
        <div className="w-full h-[200px] bg-inputColor"></div>
        <ProfileLayout username={username} />
        <Tab tab="profile" />
        {children}
      </HydrationBoundary>
    </main>
  );
};
export default Layout;
