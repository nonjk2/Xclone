import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import useUsers from "@/lib/hooks/useUsers";
import usersPosts from "@/lib/hooks/useUsersPosts";
import useUsersPosts from "@/lib/hooks/useUsersPosts";
import { serverClient } from "@/lib/util/serverSBClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string; tab: Tabs };
}) => {
  const { username } = params;
  const client = serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useUsers({ client, username }));
  await queryClient.prefetchQuery(usersPosts({ client, username }));
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className="relative w-full">
      <HydrationBoundary state={dehydratedState}>
        <div className="w-full h-[200px] bg-inputColor"></div>
        <ProfileLayout username={username} />
        <Tab tab="profile" />
        <Suspense>{children}</Suspense>
      </HydrationBoundary>
    </main>
  );
};
export default Layout;
