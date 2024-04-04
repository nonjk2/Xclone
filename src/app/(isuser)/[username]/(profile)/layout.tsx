import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import { getUsers, getUsersPosts } from "@/lib/action/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string; tab: Tabs };
}) => {
  const { username } = params;
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUsers,
  });
  await client.prefetchQuery({
    queryKey: ["users", "posts", username],
    queryFn: getUsersPosts,
  });
  const dehydratedState = dehydrate(client);
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
